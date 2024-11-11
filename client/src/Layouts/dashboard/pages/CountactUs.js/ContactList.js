import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateContact from "./CreateContact"; // CreateContact modal component
import ViewContact from "./ViewContact"; // ViewContact modal component
import { useUser } from "../../../../helper/userContext";
import { Table } from "flowbite-react";

function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const { token } = useUser();

    const fetchAllContacts = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("http://localhost:3001/contactus", config);
            setContacts(res.data);
            setFilteredContacts(res.data);
        } catch (err) {
            console.error("Error fetching contacts:", err);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAllContacts();
        }
    }, [token]);

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://localhost:3001/contactus/${id}`, config);
            fetchAllContacts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredContacts(filtered);
    };

    return (
        <div className="bg-[#d9d9fb] p-5">
            <div className="flex justify-between mb-4">
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Submit New Contact
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
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Message</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Actions</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((item) => (
                                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                    </Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>
                                    <Table.Cell>{item.message}</Table.Cell>
                                    <Table.Cell>
                                        <button
                                            onClick={() => {
                                                setIsViewModalOpen(true);
                                                setSelectedContactId(item.id);
                                            }}
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        >
                                            View
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
                                <Table.Cell colSpan="4" className="text-center">No contacts found</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>

            {isCreateModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <CreateContact
                            isOpen={isCreateModalOpen}
                            onClose={() => setIsCreateModalOpen(false)}
                            onSave={() => {
                                setIsCreateModalOpen(false);
                                fetchAllContacts();
                            }}
                        />
                    </div>
                </div>
            )}
            {isViewModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <ViewContact
                            contactId={selectedContactId}
                            isOpen={isViewModalOpen}
                            onClose={() => setIsViewModalOpen(false)}
                        />
                    </div>
                </div>
            )}
            {(isCreateModalOpen || isViewModalOpen) && <div className="modal-backdrop"></div>}
        </div>
    );
}

export default ContactList;
