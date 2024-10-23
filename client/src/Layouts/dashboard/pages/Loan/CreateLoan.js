import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

function CreateLoan({ isOpen, onClose, onSave, books, users }) {
    const [borrowDate, setBorrowDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("borrowed");
    const [bookId, setBookId] = useState("");
    const [userId, setUserId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newLoan = {
                borrowDate,
                returnDate,
                dueDate,
                status,
                bookId,
                userId,
            };
            await axios.post("http://localhost:3001/loan", newLoan);
            onSave(); // Refresh the loan list after saving
            onClose(); // Close the modal after saving
            resetForm(); // Reset form fields
        } catch (err) {
            console.error("Error creating loan:", err);
            // Handle error (e.g., show a notification)
        }
    };

    const resetForm = () => {
        setBorrowDate("");
        setReturnDate("");
        setDueDate("");
        setStatus("borrowed");
        setBookId("");
        setUserId("");
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Create Loan</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <Label htmlFor="borrowDate" value="Borrow Date" />
                        <TextInput
                            id="borrowDate"
                            type="date"
                            required
                            value={borrowDate}
                            onChange={(e) => setBorrowDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="returnDate" value="Return Date" />
                        <TextInput
                            id="returnDate"
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="dueDate" value="Due Date" />
                        <TextInput
                            id="dueDate"
                            type="date"
                            required
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="status" value="Status" />
                        <Select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="borrowed">Borrowed</option>
                            <option value="returned">Returned</option>
                            <option value="overdue">Overdue</option>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="bookId" value="Book" />
                        <Select
                            id="bookId"
                            required
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                        >
                            <option value="">Select Book</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="userId" value="User" />
                        <Select
                            id="userId"
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>
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

export default CreateLoan;
