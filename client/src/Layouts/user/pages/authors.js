import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);

    const apiUrl = "http://localhost:3001/author";

    const fetchAuthors = async () => {
        try {
            const response = await axios.get(apiUrl);
            setAuthors(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    // Helper function to limit bio length
    const shortenBio = (bio) => {
        const maxLength = 50; // Set max character length for bio
        if (bio.length <= maxLength) return bio;
        return `${bio.slice(0, maxLength)}...`;
    };

    return (
        <div className="bg-[#fdf5f0] min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center text-[#563f32] mb-8">Authors</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {authors.length > 0 ? (
                    authors.map((author) => (
                        <Link to={`/authors/${author.id}`} key={author.id}>
                            <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105">
                                {author.image ? (
                                    <img
                                        src={`http://localhost:3001/${author.image}`}
                                        alt={`${author.name}'s profile`}
                                        className="w-24 h-24 rounded-full object-cover mb-4"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                                <h2 className="text-lg font-semibold text-blue-600">{author.name}</h2>
                                <p className="text-gray-600 text-center mt-2">
                                    {author.bio ? shortenBio(author.bio) : 'No bio available.'}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center italic text-white">No authors found.</p>
                )}
            </div>
        </div>
    );
};

export default Authors;
