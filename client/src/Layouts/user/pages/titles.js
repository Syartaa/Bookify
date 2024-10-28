import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Titles = () => {
    const [books, setBooks] = useState([]); // State to hold book data
    const [error, setError] = useState(null); // State to hold any errors

    // URL of the API endpoint
    const apiUrl = 'http://localhost:3001/book';

    // Function to fetch books
    const fetchBooks = async () => {
        try {
            const response = await axios.get(apiUrl);
            setBooks(response.data); // Update the state with fetched books
        } catch (err) {
            setError(err.message); // Set error message
        }
    };

    // Fetch books when the component mounts
    useEffect(() => {
        fetchBooks();
    }, []);

    // Render the component
    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Book Titles</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book.id} className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-lg font-semibold text-blue-600">{book.title}</h2>
                            <p className="text-gray-600">
                                {typeof book.author === 'string' ? book.author : book.author.name}
                            </p>
                            <img
                                src={`http://localhost:3001/uploads/${book.image}`} // Adjust according to your image path
                                alt={book.title}
                                className="mt-2 w-full h-auto rounded-md"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-center italic">No books found.</p>
                )}
            </div>
        </div>
    );
};

export default Titles;
