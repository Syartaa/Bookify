import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

function CreateReservation({ isOpen, onClose, onSave, books, users }) {
    const [reservationDate, setReservationDate] = useState("");
    const [bookId, setBookId] = useState("");
    const [userId, setUserId] = useState("");
    const { token } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const formData = {
                reservationDate,
                bookId,
                userId,
            };

            await axios.post("http://localhost:3001/reservation", formData, config);
            onSave(); // Refresh the list after saving
            setReservationDate("");
            setBookId("");
            setUserId("");
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error creating reservation:", err);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Create Reservation</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <Label htmlFor="reservationDate" value="Reservation Date" />
                        <TextInput
                            id="reservationDate"
                            type="date"
                            required
                            value={reservationDate}
                            onChange={(e) => setReservationDate(e.target.value)}
                        />
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

export default CreateReservation;
