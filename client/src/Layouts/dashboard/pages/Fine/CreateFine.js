import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";


function CreateFine({ isOpen, onClose, onSave, loans, users }) {
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("unpaid");
    const [loanId, setLoanId] = useState("");
    const [userId, setUserId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newFine = {
                amount,
                status,
                loanId,
                userId,
            };
            await axios.post("http://localhost:3001/fine", newFine);
            onSave(); // Refresh the fine list after saving
            onClose(); // Close the modal after saving
            resetForm(); // Reset form fields
        } catch (err) {
            console.error("Error creating fine:", err);
            // Handle error (e.g., show a notification)
        }
    };

    const resetForm = () => {
        setAmount("");
        setStatus("unpaid");
        setLoanId("");
        setUserId("");
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Create Fine</Modal.Header>
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

export default CreateFine;
