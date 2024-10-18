import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";

function EditReservation({ isOpen, onClose, onSave, reservationId, books, users }) {
    const [reservationDate, setReservationDate] = useState("");
    const [bookId, setBookId] = useState("");
    const [userId, setUserId] = useState("");
    const { token } = useUser();

    useEffect(() => {
        // Fetch the reservation details when editing
        const fetchReservationDetails = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const response = await axios.get(
                    `http://localhost:3001/reservation/${reservationId}`,
                    config
                );
                const reservation = response.data;

                setReservationDate(reservation.reservationDate);
                setBookId(reservation.bookId);
                setUserId(reservation.userId);
            } catch (err) {
                console.error("Error fetching reservation:", err);
            }
        };

        if (reservationId) {
            fetchReservationDetails();
        }
    }, [reservationId, token]);

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

            await axios.put(`http://localhost:3001/reservation/${reservationId}`, formData, config);
            onSave(); // Refresh the list after editing
            onClose(); // Close the modal after saving
        } catch (err) {
            console.error("Error updating reservation:", err);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Edit Reservation</Modal.Header>
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
                            Update
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

export default EditReservation;
