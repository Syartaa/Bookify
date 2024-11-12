import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateLoan from "./CreateLoan"; // CreateLoan modal component
import EditLoan from "./EditLoan"; // EditLoan modal component
import { useUser } from "../../../../helper/userContext";
import { Table, Alert } from "flowbite-react"; // Importing Alert for error handling

function LoanList() {
    const [loans, setLoans] = useState([]);
    const [filteredLoans, setFilteredLoans] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedLoanId, setSelectedLoanId] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [books, setBooks] = useState([]); // State for books
    const [users, setUsers] = useState([]); // State for users
    
    const { token } = useUser();

    const fetchAllLoans = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset error
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/loan", config);
            setLoans(res.data);
            setFilteredLoans(res.data);
        } catch (err) {
            console.error("Error fetching loans:", err);
            setError("Failed to load loans. Please try again later."); // Set error message
        } finally {
            setLoading(false); // End loading
        }
    };

    const fetchBooks = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/book", config);
            setBooks(res.data);
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("Failed to load books. Please try again later.");
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
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users. Please try again later.");
        }
    };

    useEffect(() => {
        if (token) {
            fetchAllLoans();
            fetchBooks(); // Fetch books on mount
            fetchUsers(); // Fetch users on mount
        }
    }, [token]);

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://localhost:3001/loan/${id}`, config);
            fetchAllLoans();
        } catch (err) {
            console.error(err);
            setError("Failed to delete loan. Please try again."); // Set error message
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = loans.filter((loan) =>
            loan.status.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredLoans(filtered);
    };

    return (
        <div className="bg-[#d9d9fb] p-5">
            {error && <Alert color="failure">{error}</Alert>} {/* Display error message */}

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
                        <Table.HeadCell>Borrow Date</Table.HeadCell>
                        <Table.HeadCell>Return Date</Table.HeadCell>
                        <Table.HeadCell>Due Date</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Book</Table.HeadCell>
                        <Table.HeadCell>User</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Actions</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {loading ? ( // Show loading state
                            <Table.Row>
                                <Table.Cell colSpan="7" className="text-center">Loading...</Table.Cell>
                            </Table.Row>
                        ) : filteredLoans.length > 0 ? (
                            filteredLoans.map((item) => (
                                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {new Date(item.borrowDate).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>{item.returnDate ? new Date(item.returnDate).toLocaleDateString() : "Not returned"}</Table.Cell>
                <Table.Cell>{new Date(item.dueDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{item.status}</Table.Cell>
                <Table.Cell>{item.book ? item.book.title : "Unknown Book"}</Table.Cell> {/* Book title */}
                <Table.Cell>{item.user ? item.user.name : "Unknown User"}</Table.Cell> {/* User name */}

                                    <Table.Cell>
                                        <button
                                            onClick={() => {
                                                setIsEditModalOpen(true);
                                                setSelectedLoanId(item.id);
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
                                <Table.Cell colSpan="7" className="text-center">No loans found</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>

            {isCreateModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <CreateLoan
                            isOpen={isCreateModalOpen}
                            onClose={() => setIsCreateModalOpen(false)}
                            onSave={() => {
                                setIsCreateModalOpen(false);
                                fetchAllLoans();
                            }}
                            books={books} // Pass books to CreateLoan
                            users={users} // Pass users to CreateLoan
                        />
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <EditLoan
                            loanId={selectedLoanId}
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            onSave={() => {
                                setIsEditModalOpen(false);
                                fetchAllLoans();
                            }}
                            books={books} // Pass books to EditLoan
                            users={users} // Pass users to EditLoan
                        />
                    </div>
                </div>
            )}
            {(isCreateModalOpen || isEditModalOpen) && <div className="modal-backdrop"></div>}
        </div>
    );
}

export default LoanList;
