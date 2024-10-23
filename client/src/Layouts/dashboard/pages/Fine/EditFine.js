import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

function EditFine({ isOpen, onClose, onSave, fine, loans, users }) {
    const [amount, setAmount] = useState(fine.amount || "");
    const [status, setStatus] = useState(fine.status || "unpaid");
    const [loanId, setLoanId] = useState(fine.loanId || "");
    const [userId, setUserId] = useState(fine.userId || "");

    useEffect(() => {
        setAmount(fine.amount || "");
        setStatus(fine.status || "unpaid");
        setLoanId(fine.loanId || "");
        setUserId(fine.userId || "");
    }, [fine]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFine = {
                amount,
                status,
                loanId,
                userId,
            };
            await axios.put(`http://localhost:3001/fine/${fine.id}`, updatedFine);
            onSave(); // Refresh the fine list after saving
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error updating fine:", err);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Edit Fine</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <Label htmlFor="amount" value="Amount" />
                        <TextInput
                            id="amount"
                            type="number"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="status" value="Status" />
                        <Select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="unpaid">Unpaid</option>
                            <option value="paid">Paid</option>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="loanId" value="Loan" />
                        <Select
                            id="loanId"
                            required
                            value={loanId}
                            onChange={(e) => setLoanId(e.target.value)}
                        >
                            <option value="">Select Loan</option>
                            {loans.map((loan) => (
                                <option key={loan.id} value={loan.id}>
                                    {loan.borrowDate} - {loan.returnDate}
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

export default EditFine;
