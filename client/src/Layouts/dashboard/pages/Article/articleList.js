import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateArticle from "./createArticle"; // CreateArticle modal component
import EditArticle from "./editArticle"; // EditArticle modal component
import { Table } from "flowbite-react"; // Import Flowbite Table

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const fetchAllArticles = async () => {
    try {
      const res = await axios.get("http://localhost:3001/article");
      setArticles(res.data);
      setFilteredArticles(res.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/article/${id}`);
      fetchAllArticles();
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="bg-[#d9d9fb] p-5">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          type="button"
          className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Create new
        </button>

        <div className="relative">
          <label htmlFor="search" className="sr-only">Search</label>
          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            id="search"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
            placeholder="Search"
            required
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Content</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((item) => (
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {item.imageUrl ? (
                      <img
                        src={`http://localhost:3001/${item.imageUrl}`} // Adjust the path as needed
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "No image"
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </Table.Cell>
                  <Table.Cell>{item.content}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setSelectedArticleId(item.id);
                      }}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="font-medium text-red-600 hover:underline dark:text-red-500 ms-2"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="4" className="text-center">No articles found</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {isCreateModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <CreateArticle
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              onSave={() => {
                setIsCreateModalOpen(false);
                fetchAllArticles();
              }}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <EditArticle
              articleId={selectedArticleId}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSave={() => {
                setIsEditModalOpen(false);
                fetchAllArticles();
              }}
            />
          </div>
        </div>
      )}
      {(isCreateModalOpen || isEditModalOpen) && <div className="modal-backdrop"></div>}
    </div>
  );
}

export default ArticleList;
