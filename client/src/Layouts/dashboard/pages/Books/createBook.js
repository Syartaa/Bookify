import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Button, Modal, Label, TextInput, Select, Textarea } from "flowbite-react";

function CreateBook({ isOpen, onClose, onSave, categories, authors }) {
    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [availabilityStatus, setAvailabilityStatus] = useState("available");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // New state for image
    const { token } = useUser();
    const [popularity, setPopularity] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Set the content type for file upload
                },
            };

            const formData = new FormData(); // Create a FormData object
            formData.append("title", title);
            formData.append("isbn", isbn);
            formData.append("publishedDate", publishedDate);
            formData.append("categoryId", categoryId);
            formData.append("authorId", authorId);
            formData.append("availabilityStatus", availabilityStatus);
            formData.append("description", description);
            formData.append("popularity", popularity);
            if (image) {
                formData.append("image", image); // Append the image file
            }

            await axios.post("http://localhost:3001/book", formData, config);
            onSave(); // Refresh the list after saving
            setTitle("");
            setIsbn("");
            setPublishedDate("");
            setCategoryId("");
            setAuthorId("");
            setAvailabilityStatus("available");
            setDescription("");
            setImage(null); // Reset image input
            onClose(); // Close the modal after saving
            setPopularity(0);
        } catch (err) {
            console.error("Error creating book:", err);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Create Book</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <Label htmlFor="title" value="Book Title" />
                        <TextInput
                            id="title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="isbn" value="ISBN" />
                        <TextInput
                            id="isbn"
                            required
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="publishedDate" value="Published Date" />
                        <TextInput
                            id="publishedDate"
                            type="date"
                            required
                            value={publishedDate}
                            onChange={(e) => setPublishedDate(e.target.value)}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <Label htmlFor="category" value="Category" />
                        <Select
                            id="category"
                            required
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="author" value="Author" />
                        <Select
                            id="author"
                            required
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
                        >
                            <option value="">Select Author</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="availabilityStatus" value="Availability Status" />
                        <Select
                            id="availabilityStatus"
                            required
                            value={availabilityStatus}
                            onChange={(e) => setAvailabilityStatus(e.target.value)}
                        >
                            <option value="available">Available</option>
                            <option value="borrowed">Borrowed</option>
                            <option value="reserved">Reserved</option>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="description" value="Description" />
                        <Textarea
                            id="description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}  // Adjust height with rows
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="popularity" value="Popularity (1-5)" />
                        <TextInput
                            id="popularity"
                            type="number"
                            min="1"
                            max="5"
                            required
                            value={popularity}
                            onChange={(e) => setPopularity(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="image" value="Upload Image" />
                        <input
                            type="file"
                            id="image"
                            accept="image/*" // Restrict to image files
                            onChange={(e) => setImage(e.target.files[0])} // Get the first selected file
                        />
                    </div>
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

export default CreateBook;
