import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Modal, Button, Label, TextInput, Textarea } from "flowbite-react";

function EditAuthor({ authorId, isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null); // For storing the image file
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
        setImage(res.data.image); // Assuming image URL is returned in the response
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    if (authorId && isOpen) {
      fetchAuthor();
    }
  }, [authorId, token, isOpen]);

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
        formData.append("image", image); // Include the image file if it's selected
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.put(`http://localhost:3001/author/${authorId}`, formData, config);
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
              <Label htmlFor="editAuthorName" value="Author Name" />
              <TextInput
                id="editAuthorName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter author's name"
                required
              />
            </div>
            <div>
              <Label htmlFor="editAuthorBio" value="Author Bio" />
              <Textarea
                id="editAuthorBio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter author's bio"
                rows={4} // Adjusted the rows to fit multi-line text input
                required
              />
            </div>
            <div>
              <Label htmlFor="editAuthorImage" value="Author Image" />
              <input
                type="file"
                id="editAuthorImage"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
              />
              {image && typeof image === "string" && (
                <img src={`http://localhost:3001/${image}`} alt="Author" className="w-16 h-16 mt-2 object-cover rounded" />
              )}
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
