import React, { useEffect, useState } from "react";
import CreateBook from "./createBook";
import EditBook from "./editBook";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../../../../helper/userContext";

function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [categories, setCategories] = useState([]); // State for categories
  const [authors, setAuthors] = useState([]); // State for authors
  const { token } = useUser();

  const fetchAllBooks = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3001/book", config);
      const booksData = res.data.map((book) => {
        const imageFilename = book?.image?.split(/[\\/]/).pop();
        return {
          imageFilename,
          ...book,
        };
      });
      setBooks(booksData);
      setFilteredBooks(booksData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategoriesAndAuthors = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const [categoriesResponse, authorsResponse] = await Promise.all([
        axios.get("http://localhost:3001/category", config), // Endpoint for categories
        axios.get("http://localhost:3001/author", config), // Endpoint for authors
      ]);
      setCategories(categoriesResponse.data); // Set categories
      setAuthors(authorsResponse.data); // Set authors
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookDetails = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`http://localhost:3001/book/${id}`, config);
      setSelectedBook(res.data); // Set the selected book details
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllBooks();
      fetchCategoriesAndAuthors(); // Fetch categories and authors when token is available
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3001/book/${id}`, config);
      fetchAllBooks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="bg-[#d9d9fb] ">
      <div className="flex flex-row justify-between items-center">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          type="button"
          className="m-5 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create new
        </button>

        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-2">
        {filteredBooks?.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex flex-col items-center pb-10 mt-5">
            <img
  className="w-24 h-32 mb-3 shadow-lg" // Changed to h-32 for better aspect ratio
  src={`http://localhost:3001/uploads/${item.imageFilename}`}
  alt="Book cover"
/>
              <Link to={`/book/${item.id}`} className="no-underline">
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h5>
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.authorId} {/* You may want to map authorId to author name */}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                ISBN: {item.isbn}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.availabilityStatus}
              </div>
              <div className="flex mt-4 md:mt-6">
                <button
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setSelectedBookId(item.id);
                    fetchBookDetails(item.id);
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {isCreateModalOpen && (
          <div className="modal-container">
            <div className="modal-content">
              <CreateBook
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={() => {
                  setIsCreateModalOpen(false);
                  fetchAllBooks();
                }}
                categories={categories} // Pass categories
                authors={authors} // Pass authors
              />
            </div>
          </div>
        )}

        {isEditModalOpen && selectedBook && (
          <div className="modal-container">
            <div className="modal-content">
              <EditBook
                authors={authors} // Pass authors
                categories={categories} // Pass categories
                bookId={selectedBookId}
                isOpen={isEditModalOpen}
                onClose={() => {
                  setIsEditModalOpen(false);
                  setSelectedBook(null);
                }}
                onSave={() => {
                  setIsEditModalOpen(false);
                  fetchAllBooks();
                  setSelectedBook(null);
                }}
              />
            </div>
          </div>
        )}

        {(isCreateModalOpen || isEditModalOpen) && (
          <div className="modal-backdrop"></div>
        )}
      </div>
    </div>
  );
}

export default BookList;
