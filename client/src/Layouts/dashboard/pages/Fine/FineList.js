import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateFine from "./CreateFine"; // CreateFine modal component
import EditFine from "./EditFine"; // EditFine modal component
import { useUser } from "../../../../helper/userContext";
import { Table, Alert } from "flowbite-react"; // Importing Alert for error handling

function FineList() {
    const [fines, setFines] = useState([]);
    const [filteredFines, setFilteredFines] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedFineId, setSelectedFineId] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [loans, setLoans] = useState([]); // State for loans
    const [users, setUsers] = useState([]); // State for users
    const { token } = useUser();

    const fetchAllFines = async () => {
        setLoading(true);
        setError(null);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/fine", config);
            setFines(res.data);
            console.log("Fetched fines data:", res.data);

            setFilteredFines(res.data);
        } catch (err) {
            console.error("Error fetching fines:", err);
            setError("Failed to load fines. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const fetchLoans = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/loan", config);
            setLoans(res.data);

        } catch (err) {
            console.error("Error fetching loans:", err);
            setError("Failed to load loans. Please try again later.");
        }
    };

    const fetchUsers = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/user", config);
            
            // Log the response to inspect the structure
            console.log('Fetched users:', res.data);
    
            // Ensure users is an array
            if (Array.isArray(res.data)) {
                setUsers(res.data);
            } else {
               // setError("Unexpected response format for users.");
            }
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users. Please try again later.");
        }
    };

    useEffect(() => {
        if (token) {
            fetchAllFines();
            fetchLoans();
            fetchUsers();
        }
    }, [token]);

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://localhost:3001/fine/${id}`, config);
            fetchAllFines();
        } catch (err) {
            console.error(err);
            setError("Failed to delete fine. Please try again.");
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = fines.filter((fine) =>
            fine.paymentStatus.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFines(filtered);
    };

    

    return (
        <div className="bg-[#d9d9fb] p-5">
            {error && <Alert color="failure">{error}</Alert>}

            <div className="flex justify-between mb-4">
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Create new
                </button>

                <div className="relative">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <input
                        type="search"
                        onChange={(e) => handleSearch(e.target.value)}
                        id="search"
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
                        placeholder="Search"
                        required
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Amount</Table.HeadCell>
                        <Table.HeadCell>Payment Status</Table.HeadCell>
                        <Table.HeadCell>Loan</Table.HeadCell>
                        <Table.HeadCell>User</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Actions</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        
                        {loading ? (
                            <Table.Row>
                                <Table.Cell colSpan="5" className="text-center">Loading...</Table.Cell>
                            </Table.Row>
                        ) : filteredFines.length > 0 ? (
                            filteredFines.map((item) => (
                                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.amount != null ? Number(item.amount).toFixed(2) : "N/A"}
                                    </Table.Cell>
                                    <Table.Cell>{item.paymentStatus}</Table.Cell>
                                    <Table.Cell>{item.loan?.id}</Table.Cell>
                                    <Table.Cell>{item.user?.name}</Table.Cell>
                                    <Table.Cell>
                                        <button
                                            onClick={() => {
                                                setIsEditModalOpen(true);
                                                setSelectedFineId(item.id);
                                            }}
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="font-medium text-red-600 hover:underline dark:text-red-500 ms-2"
                                        >
                                            Delete
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan="5" className="text-center">No fines found</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>

            {isCreateModalOpen && (
                <CreateFine
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={() => {
                        setIsCreateModalOpen(false);
                        fetchAllFines();
                    }}
                    loans={loans}
                    users={users}
                />
            )}
            {isEditModalOpen && selectedFineId && (
                <EditFine
                    fineId={selectedFineId}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={() => {
                        setIsEditModalOpen(false);
                        fetchAllFines();
                    }}
                    loans={loans}
                    users={users}
                />
            )}
            {(isCreateModalOpen || isEditModalOpen) && <div className="modal-backdrop"></div>}
        </div>
    );
}

export default FineList;
