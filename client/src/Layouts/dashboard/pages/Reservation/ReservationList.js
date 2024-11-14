import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateReservation from "./CreateReservation"; // CreateReservation modal component
import EditReservation from "./EditReservation"; // EditReservation modal component
import { useUser } from "../../../../helper/userContext";
import { Table, Alert } from "flowbite-react"; // Importing Alert for error handling
import Pagination from "../../components/Pagination"; // Import Pagination component

function ReservationList() {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [books, setBooks] = useState([]); // State for books
    const [users, setUsers] = useState([]); // State for users
    const { token } = useUser();
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 5; // Number of items per page

    const fetchAllReservations = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset error
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/reservation", config);
            setReservations(res.data);
            setFilteredReservations(res.data);
        } catch (err) {
            console.error("Error fetching reservations:", err);
            setError("Failed to load reservations. Please try again later."); // Set error message
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
            fetchAllReservations();
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
            await axios.delete(`http://localhost:3001/reservation/${id}`, config);
            fetchAllReservations();
        } catch (err) {
            console.error(err);
            setError("Failed to delete reservation. Please try again."); // Set error message
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = reservations.filter((reservation) =>
            reservation.status.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredReservations(filtered);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
    const currentItems = filteredReservations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                        <Table.HeadCell>Reservation Date</Table.HeadCell>
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
                                <Table.Cell colSpan="5" className="text-center">Loading...</Table.Cell>
                            </Table.Row>
                        ) : currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {new Date(item.reservationDate).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>{item.status}</Table.Cell>
                                    <Table.Cell>{item.book?.title}</Table.Cell>
                                    <Table.Cell>{item.user?.name}</Table.Cell>
                                    <Table.Cell>
                                        <button
                                            onClick={() => {
                                                setIsEditModalOpen(true);
                                                setSelectedReservationId(item.id);
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
                                <Table.Cell colSpan="5" className="text-center">No reservations found</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            /> {/* Add Pagination component here */}

            {isCreateModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <CreateReservation
                            isOpen={isCreateModalOpen}
                            onClose={() => setIsCreateModalOpen(false)}
                            onSave={() => {
                                setIsCreateModalOpen(false);
                                fetchAllReservations();
                            }}
                            books={books} // Pass books to CreateReservation
                            users={users} // Pass users to CreateReservation
                        />
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <EditReservation
                            reservationId={selectedReservationId}
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            onSave={() => {
                                setIsEditModalOpen(false);
                                fetchAllReservations();
                            }}
                            books={books} // Pass books to EditReservation
                            users={users} // Pass users to EditReservation
                        />
                    </div>
                </div>
            )}
            {(isCreateModalOpen || isEditModalOpen) && <div className="modal-backdrop"></div>}
        </div>
    );
}

export default ReservationList;
