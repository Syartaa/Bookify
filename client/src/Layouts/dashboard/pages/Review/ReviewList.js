import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateReview from "./CreateReview"; // CreateReview modal component
import EditReview from "./EditReview"; // EditReview modal component
import { useUser } from "../../../../helper/userContext";
import { Table, Alert } from "flowbite-react"; // Importing Alert for error handling

function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [books, setBooks] = useState([]); // State for books
    const [users, setUsers] = useState([]); // State for users
    const { token } = useUser();

    const fetchAllReviews = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset error
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/review", config);
            setReviews(res.data);
            setFilteredReviews(res.data);
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setError("Failed to load reviews. Please try again later."); // Set error message
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
            fetchAllReviews();
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
            await axios.delete(`http://localhost:3001/review/${id}`, config);
            fetchAllReviews();
        } catch (err) {
            console.error(err);
            setError("Failed to delete review. Please try again."); // Set error message
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = reviews.filter((review) =>
            review.comment.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredReviews(filtered);
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
                        <Table.HeadCell>Rating</Table.HeadCell>
                        <Table.HeadCell>Comment</Table.HeadCell>
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
                        ) : filteredReviews.length > 0 ? (
                            filteredReviews.map((item) => (
                                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.rating}
                                    </Table.Cell>
                                    <Table.Cell>{item.comment}</Table.Cell>
                                    <Table.Cell>{item.book?.title}</Table.Cell>
                                    <Table.Cell>{item.user?.name}</Table.Cell>
                                    <Table.Cell>
                                        <button
                                            onClick={() => {
                                                setIsEditModalOpen(true);
                                                setSelectedReviewId(item.id);
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
                                <Table.Cell colSpan="5" className="text-center">No reviews found</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>

            {isCreateModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <CreateReview
                            isOpen={isCreateModalOpen}
                            onClose={() => setIsCreateModalOpen(false)}
                            onSave={() => {
                                setIsCreateModalOpen(false);
                                fetchAllReviews();
                            }}
                            books={books} // Pass books to CreateReview
                            users={users} // Pass users to CreateReview
                        />
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <EditReview
                            reviewId={selectedReviewId}
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            onSave={() => {
                                setIsEditModalOpen(false);
                                fetchAllReviews();
                            }}
                            books={books} // Pass books to EditReview
                            users={users} // Pass users to EditReview
                        />
                    </div>
                </div>
            )}
            {(isCreateModalOpen || isEditModalOpen) && <div className="modal-backdrop"></div>}
        </div>
    );
}

export default ReviewList;
