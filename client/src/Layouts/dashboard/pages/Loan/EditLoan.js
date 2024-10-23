import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

function EditLoan({ loanId, isOpen, onClose, onSave, books, users }) {
    const [loanData, setLoanData] = useState(null);

    useEffect(() => {
        const fetchLoanData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/loan/${loanId}`);
                setLoanData(res.data);
            } catch (err) {
                console.error("Error fetching loan data:", err);
            }
        };

        if (loanId) {
            fetchLoanData();
        }
    }, [loanId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/loan/${loanId}`, loanData);
            onSave(); // Refresh the loan list after saving
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error updating loan:", err);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        isOpen && loanData && (
            <Modal show={isOpen} onClose={onClose} size="md">
                <Modal.Header>Edit Loan</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <Label htmlFor="borrowDate" value="Borrow Date" />
                            <TextInput
                                id="borrowDate"
                                type="date"
                                required
                                value={loanData.borrowDate.slice(0, 10)}
                                onChange={(e) => setLoanData({ ...loanData, borrowDate: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="returnDate" value="Return Date" />
                            <TextInput
                                id="returnDate"
                                type="date"
                                value={loanData.returnDate ? loanData.returnDate.slice(0, 10) : ""}
                                onChange={(e) => setLoanData({ ...loanData, returnDate: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="dueDate" value="Due Date" />
                            <TextInput
                                id="dueDate"
                                type="date"
                                required
                                value={loanData.dueDate.slice(0, 10)}
                                onChange={(e) => setLoanData({ ...loanData, dueDate: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="status" value="Status" />
                            <Select
                                id="status"
                                value={loanData.status}
                                onChange={(e) => setLoanData({ ...loanData, status: e.target.value })}
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
                                value={loanData.bookId}
                                onChange={(e) => setLoanData({ ...loanData, bookId: e.target.value })}
                            >
                                <option value="">Select a book</option>
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
                                value={loanData.userId}
                                onChange={(e) => setLoanData({ ...loanData, userId: e.target.value })}
                            >
                                <option value="">Select a user</option>
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
                                Update Loan
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

export default EditLoan;
