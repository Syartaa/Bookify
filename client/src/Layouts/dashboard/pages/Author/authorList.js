import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateAuthor from "./createAuthor"; // CreateAuthor modal component
import EditAuthor from "./editAuthor"; // EditAuthor modal component
import { useUser } from "../../../../helper/userContext";
import { Table } from "flowbite-react"; // Import Flowbite Table
import Pagination from "../../components/Pagination";

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const { token } = useUser();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [authorsPerPage] = useState(6); // Authors per page

  const fetchAllAuthors = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3001/author", config);
      console.log("Fetched authors:", res.data); // Log the entire fetched data

      setAuthors(res.data);
      setFilteredAuthors(res.data);
    } catch (err) {
      console.error("Error fetching authors:", err); // Improved error logging
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllAuthors();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3001/author/${id}`, config);
      fetchAllAuthors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = authors.filter((author) =>
      author.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAuthors(filtered);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

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
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Bio</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentAuthors.length > 0 ? (
              currentAuthors.map((item) => (
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {item.image ? (
                      <img
                        src={`http://localhost:3001/${item.image}`} // Adjust the path as needed
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "No image"
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell>{item.bio}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setSelectedAuthorId(item.id);
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
                <Table.Cell colSpan="4" className="text-center">No authors found</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {isCreateModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateAuthor
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              onSave={() => {
                setIsCreateModalOpen(false);
                fetchAllAuthors();
              }}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <EditAuthor
              authorId={selectedAuthorId}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSave={() => {
                setIsEditModalOpen(false);
                fetchAllAuthors();
              }}
            />
          </div>
        </div>
      )}
      {(isCreateModalOpen || isEditModalOpen) && <div className="modal-backdrop"></div>}

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AuthorList;
