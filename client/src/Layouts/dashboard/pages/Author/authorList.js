import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateAuthor from "./createAuthor"; // CreateAuthor modal component
import EditAuthor from "./editAuthor"; // EditAuthor modal component
import { useUser } from "../../../../helper/userContext";
import { Table } from "flowbite-react"; // Import Flowbite Table
// import '../../../../css/modal.css'; // Ensure this CSS file has the necessary styles

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const { token } = useUser();

  const fetchAllAuthors = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3001/author", config);
      console.log("Fetched authors:", res.data); // Log the entire fetched data
console.log("First author:", res.data[0]); // Log the first author object

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
            <Table.HeadCell>Bio</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredAuthors.length > 0 ? (
              filteredAuthors.map((item) => (
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                <Table.Cell colSpan="3" className="text-center">No authors found</Table.Cell>
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
    </div>
  );
}

export default AuthorList;
