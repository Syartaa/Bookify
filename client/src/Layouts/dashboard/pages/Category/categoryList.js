import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateCategory from "./createCategory"; // CreateCategory modal component
import EditCategory from "./editCategory"; // EditCategory modal component
import { useUser } from "../../../../helper/userContext";
import { Table } from "flowbite-react";
import Pagination from "../../components/Pagination";// Import the Pagination component

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const { token } = useUser();

    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [categoriesPerPage] = useState(6); // Categories per page

    const fetchAllCategories = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/category", config);
            setCategories(res.data);
            setFilteredCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAllCategories();
        }
    }, [token]);

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://localhost:3001/category/${id}`, config);
            fetchAllCategories();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = categories.filter((category) =>
            category.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    // Calculate paginated categories
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="bg-[#d9d9fb] p-5">
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
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Actions</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {currentCategories.length > 0 ? (
                            currentCategories.map((item) => (
                                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                    </Table.Cell>
                                    <Table.Cell>{item.description}</Table.Cell>
                                    <Table.Cell>
                                        <button
                                            onClick={() => {
                                                setIsEditModalOpen(true);
                                                setSelectedCategoryId(item.id);
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
                                <Table.Cell colSpan="3" className="text-center">No categories found</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>

            {isCreateModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <CreateCategory
                            isOpen={isCreateModalOpen}
                            onClose={() => setIsCreateModalOpen(false)}
                            onSave={() => {
                                setIsCreateModalOpen(false);
                                fetchAllCategories();
                            }}
                        />
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <EditCategory
                            categoryId={selectedCategoryId}
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            onSave={() => {
                                setIsEditModalOpen(false);
                                fetchAllCategories();
                            }}
                        />
                    </div>
                </div>
            )}
            {(isCreateModalOpen || isEditModalOpen) && <div className="modal-backdrop"></div>}

            {/* Pagination Component */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default CategoryList;
