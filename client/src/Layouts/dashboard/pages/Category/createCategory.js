// components/CreateCategory.js
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Button, Modal, Label, TextInput } from "flowbite-react";

function CreateCategory({ isOpen, onClose, onSave }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { token } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post("http://localhost:3001/category", { name, description }, config);
            onSave(); // Refresh the list after saving
            setName(""); // Reset name input
            setDescription(""); // Reset description input
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error creating category:", err);
            // Optionally, you could add user feedback for errors here
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Create Category</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <Label htmlFor="name" value="Category Name" />
                        <TextInput
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="description" value="Description" />
                        <TextInput
                            id="description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {/* Buttons should be placed here */}
                    <div className="flex justify-end space-x-2">
                        <Button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
                        >
                            Create
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
    );
}

export default CreateCategory;
