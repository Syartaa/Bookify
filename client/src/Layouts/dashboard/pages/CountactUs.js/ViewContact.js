import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Modal } from "flowbite-react";

function ViewContact({ contactId, isOpen, onClose }) {
    const [contact, setContact] = useState(null);
    const { token } = useUser();

    const fetchContact = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`http://localhost:3001/contactus/${contactId}`, config);
            setContact(res.data);
        } catch (err) {
            console.error("Error fetching contact:", err);
        }
    };

    useEffect(() => {
        if (isOpen && contactId) {
            fetchContact();
        }
    }, [isOpen, contactId]);

    if (!contact) return null;

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Contact Details</Modal.Header>
            <Modal.Body>
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Message:</strong> {contact.message}</p>
            </Modal.Body>
        </Modal>
    );
}

export default ViewContact;
