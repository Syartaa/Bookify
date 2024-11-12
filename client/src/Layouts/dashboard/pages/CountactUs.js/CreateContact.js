import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";

function CreateContact({ isOpen, onClose, onSave }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const { token } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post("http://localhost:3001/contactus", { name, email, message }, config);
            onSave();
            setName("");
            setEmail("");
            setMessage("");
            onClose();
        } catch (err) {
            console.error("Error creating contact:", err);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>Submit New Contact</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Label htmlFor="name" value="Name" />
                    <TextInput id="name" required value={name} onChange={(e) => setName(e.target.value)} />

                    <Label htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Label htmlFor="message" value="Message" />
                    <Textarea id="message" required value={message} onChange={(e) => setMessage(e.target.value)} />

                    <div className="flex justify-end space-x-2">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Submit</Button>
                        <Button type="button" onClick={onClose} color="gray">Cancel</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default CreateContact;
