// components/EditCategory.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Button, Modal, Label, TextInput } from "flowbite-react";

function EditCategory({ categoryId, isOpen, onClose, onSave }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { token } = useUser();

    const fetchCategory = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`http://localhost:3001/category/${categoryId}`, config);
            setName(res.data.name);
            setDescription(res.data.description);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isOpen && categoryId) {
            fetchCategory();
        }
    }, [isOpen, categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`http://localhost:3001/category/${categoryId}`, { name, description }, config);
            onSave();
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error updating category:", err);
            // Optionally, you could add user feedback for errors here
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Edit Category</Modal.Header>
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
                    <div className="flex justify-end space-x-2">
                        <Button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
                        >
                            Save
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

export default EditCategory;
