import React, { useEffect, useState } from "react";
import axios from "axios";

const Authors = () => {
    const [authors, setAuthors] = useState([]); // State to hold author data
    const [error, setError] = useState(null); // State to hold any errors

    const apiUrl = "http://localhost:3001/author"; // URL of the API endpoint

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
        <div className="bg-orange-100 min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center text-white mb-8">Authors</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {authors.length > 0 ? (
                    authors.map((author) => (
                        <div
                            key={author.id}
                            className="flex flex-col items-center bg-white rounded-full p-6 shadow-lg transform transition-transform hover:scale-105"
                        >
                            <h2 className="text-lg font-semibold text-blue-600">{author.name}</h2>
                            <p className="text-gray-600 text-center mt-2">
                                {author.bio ? author.bio : 'No bio available.'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center italic text-white">No authors found.</p>
                )}
            </div>
        </div>
    );
};

export default Authors;
