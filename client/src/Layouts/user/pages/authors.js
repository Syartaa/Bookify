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
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Authors</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {authors.length > 0 ? (
                    authors.map((author) => (
                        <div key={author.id} className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-lg font-semibold text-blue-600">{author.name}</h2>
                            <p className="text-gray-600">
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
