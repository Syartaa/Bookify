import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../../helper/userContext";
import { Modal, Button, Label, TextInput, Textarea } from "flowbite-react";

function EditArticle({ articleId, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // For storing the image file
  const { token } = useUser();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`http://localhost:3001/article/${articleId}`, config);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.image); // Assuming image URL is returned in the response
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (articleId && isOpen) {
      fetchArticle();
    }
  }, [articleId, token, isOpen]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image && typeof image !== "string") {
        formData.append("image", image); // Include the image file if it's selected
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.put(`http://localhost:3001/article/${articleId}`, formData, config);
      onSave(); // Refresh the list after saving
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <Modal show={isOpen} size="md" popup onClose={onClose} className="fixed inset-0 flex items-center justify-center">
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 text-center">Edit Article</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="editArticleTitle" value="Article Title" />
              <TextInput
                id="editArticleTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
                required
              />
            </div>
            <div>
              <Label htmlFor="editArticleContent" value="Article Content" />
              <Textarea
                id="editArticleContent"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter article content"
                required
              />
            </div>
            <div>
              <Label htmlFor="editArticleImage" value="Article Image" />
              <input
                type="file"
                id="editArticleImage"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
              />
              {image && typeof image === "string" && (
                <img src={`http://localhost:3001/${image}`} alt="Article" className="w-16 h-16 mt-2 object-cover rounded" />
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

export default EditArticle;
