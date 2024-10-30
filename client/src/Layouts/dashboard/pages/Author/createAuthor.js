import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Button, Modal, Label, TextInput } from "flowbite-react";

function CreateAuthor({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null); // To store the image file
  const { token } = useUser();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (image) {
        formData.append("image", image); // Include the image file if selected
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post("http://localhost:3001/author", formData, config);
      onSave(); // Refresh the list after saving
      setName(""); // Reset the input field
      setBio(""); // Reset the input field
      setImage(null); // Reset the image field
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error creating author:", error);
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
              <Label htmlFor="authorName" value="Author Name" />
              <TextInput
                id="authorName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter author's name"
                required
              />
            </div>
            <div>
              <Label htmlFor="authorBio" value="Author Bio" />
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
            <div>
              <Label htmlFor="authorImage" value="Author Image" />
              <input
                type="file"
                id="authorImage"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
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
