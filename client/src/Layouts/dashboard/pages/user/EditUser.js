import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Label, Select } from "flowbite-react";

function EditUser({ userId, isOpen, onClose, onSave }) {
    const [userData, setUserData] = useState(null);

    // Fetch user data only once when userId changes
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

    // Handle role change and update the user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the role update to the backend
            await axios.put(`http://localhost:3001/user/${userId}`, { role: userData.role });
            onSave(); // Refresh the user list after saving
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error updating user role:", err);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        isOpen && userData && (
            <Modal show={isOpen} onClose={onClose} size="md">
                <Modal.Header>Edit User Role</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Role Selection */}
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
                                Update Role
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
