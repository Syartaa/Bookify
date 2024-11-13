import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import { useUser } from "../../../../helper/userContext";
import { Table } from "flowbite-react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { token } = useUser();

  const fetchAllUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3001/user", config);
      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllUsers();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3001/user/${id}`, config);
      fetchAllUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="bg-[#d9d9fb] p-5">
      <div className="flex justify-between mb-4">
        <div className="relative">
          <label htmlFor="search" className="sr-only">Search</label>
          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            id="search"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
            placeholder="Search by name"
            required
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setSelectedUserId(user.id);
                      }}
                      className="font-medium text-cyan-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="font-medium text-red-600 hover:underline ms-2"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="5" className="text-center">No users found</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {isEditModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <EditUser
              userId={selectedUserId}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSave={() => {
                setIsEditModalOpen(false);
                fetchAllUsers();
              }}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && <div className="modal-backdrop"></div>}
    </div>
  );
}

export default UserList;
