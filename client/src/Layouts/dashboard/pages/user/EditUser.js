import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

function EditUser({ userId, isOpen, onClose, onSave }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/user/${userId}`);
                setUserData(res.data.user);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/user/${userId}`, userData);
            onSave(); // Refresh the user list after saving
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error updating user:", err);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        isOpen && userData && (
            <Modal show={isOpen} onClose={onClose} size="md">
                <Modal.Header>Edit User</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="mb-4">
                            <Label htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                type="text"
                                required
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                required
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <Label htmlFor="phone" value="Phone" />
                            <TextInput
                                id="phone"
                                type="text"
                                value={userData.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <Label htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            />
                        </div>

                        {/* Role */}
                        <div className="mb-4">
                            <Label htmlFor="role" value="Role" />
                            <Select
                                id="role"
                                value={userData.role}
                                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2">
                            <Button 
                                type="submit" 
                                className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
                            >
                                Update User
                            </Button>
                            <Button 
                                type="button" 
                                onClick={onClose} 
                                color="gray"
                                className="hover:bg-gray-400 transition duration-300"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        )
    );
}

export default EditUser;
