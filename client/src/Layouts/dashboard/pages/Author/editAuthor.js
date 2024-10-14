import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Modal, Button, Label, TextInput } from "flowbite-react";

function EditAuthor({ authorId, isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const { token } = useUser();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`http://localhost:3001/author/${authorId}`, config);
        setName(res.data.name);
        setBio(res.data.bio);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    if (authorId && isOpen) {
      fetchAuthor();
    }
  }, [authorId, token, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://localhost:3001/author/${authorId}`, { name, bio }, config);
      onSave(); // Refresh the list after saving
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  return (
    <Modal show={isOpen} size="md" popup onClose={onClose} className="fixed inset-0 flex items-center justify-center">
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 text-center">Edit Author</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="editAuthorName" value="Author Name" />
              </div>
              <TextInput
                id="editAuthorName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter author's name"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="editAuthorBio" value="Author Bio" />
              </div>
              <TextInput
                id="editAuthorBio"
                as="textarea"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter author's bio"
                required
              />
            </div>
          </form>
          <div className="flex justify-end space-x-2">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
              onClick={handleSubmit}
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
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditAuthor;
