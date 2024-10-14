import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Button, Modal, Label, TextInput } from "flowbite-react";

function CreateAuthor({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const { token } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post("http://localhost:3001/author", { name, bio }, config);
      onSave(); // Refresh the list after saving
      setName(""); // Reset the input field
      setBio(""); // Reset the input field
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error creating author:", error);
      // Optionally, you could add user feedback for errors here
    }
  };

  return (
    <Modal show={isOpen} size="md" popup onClose={onClose} className="flex items-center justify-center h-full">
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 text-center">Create Author</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="authorName" value="Author Name" />
              </div>
              <TextInput
                id="authorName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter author's name"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="authorBio" value="Author Bio" />
              </div>
              <TextInput
                id="authorBio"
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
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreateAuthor;
