import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Authors = () => {
    const [authors, setAuthors] = useState([]); // State to hold author data
    const [error, setError] = useState(null); // State to hold any errors

    // URL of the API endpoint
    const apiUrl = "http://localhost:3001/author";

    // Function to fetch authors
    const fetchAuthors = async () => {
        try {
            const response = await axios.get(apiUrl);
            setAuthors(response.data); // Update the state with fetched authors
        } catch (err) {
            setError(err.message); // Set error message
        }
    };

    // Fetch authors when the component mounts
    useEffect(() => {
        fetchAuthors();
    }, []);

    // Render the component
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Authors</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {authors.length > 0 ? (
                    authors.map((author) => (
                        <div key={author.id} className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
                            <h2 className="text-xl font-semibold text-indigo-600">{author.name}</h2>
                            <p className="text-gray-700 mt-2">
                                {author.bio ? author.bio : 'No bio available.'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center italic">No authors found.</p>
                )}
            </div>
        </div>
    );
};

export default Authors;
