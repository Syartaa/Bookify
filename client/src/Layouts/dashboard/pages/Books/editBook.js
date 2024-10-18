import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

function EditBook({ isOpen, onClose, onSave, bookId, categories, authors }) {
    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [availabilityStatus, setAvailabilityStatus] = useState("available");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // New state for image
    const { token } = useUser();

    useEffect(() => {
        if (bookId) {
            fetchBookDetails();
        }
    }, [bookId]);

    const fetchBookDetails = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(`http://localhost:3001/book/${bookId}`, config);
            const book = response.data;

            setTitle(book.title);
            setIsbn(book.isbn);
            setPublishedDate(book.publishedDate);
            setCategoryId(book.categoryId);
            setAuthorId(book.authorId);
            setAvailabilityStatus(book.availabilityStatus);
            setDescription(book.description);
            setImage(null); // Reset image
        } catch (err) {
            console.error("Error fetching book details:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Set the content type for file upload
                },
            };

            const formData = new FormData();
            formData.append("title", title);
            formData.append("isbn", isbn);
            formData.append("publishedDate", publishedDate);
            formData.append("categoryId", categoryId);
            formData.append("authorId", authorId);
            formData.append("availabilityStatus", availabilityStatus);
            formData.append("description", description);
            if (image) {
                formData.append("image", image); // Append the image if selected
            }

            await axios.put(`http://localhost:3001/book/${bookId}`, formData, config);
            onSave(); // Refresh the list after saving
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error updating book:", err);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Edit Book</Modal.Header>
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
                        <TextInput
                            id="description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            Save Changes
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

export default EditBook;
