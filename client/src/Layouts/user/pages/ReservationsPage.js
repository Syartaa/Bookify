import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '../../../helper/userContext';

function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUser(); // Access the user data
  const userId = user?.user?.id; // Access the ID inside the nested 'user' object

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:3001/reservation");
        setReservations(response.data);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleLoan = async (bookId) => {
    try {
        // Replace with the actual userId (you might get this from context or props)
        const userId = 1; // Example user ID, replace with dynamic value as needed

        // Make the POST request to create a loan
        await axios.post(`http://localhost:3001/loan`, { bookId, userId });

        alert("Book loaned successfully!");

        // Fetch updated reservations after loan creation
        const response = await axios.get("http://localhost:3001/reservation");
        setReservations(response.data);
    } catch (err) {
        console.error("Error loaning book:", err);
        alert("Failed to loan book.");
    } finally {
        setLoading(false);
    }
};


  if (loading) {
    return <p className="text-center mt-8 text-lg">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-8 text-lg text-red-500">
        Error fetching reservations: {error.message}
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1
        className="text-3xl font-bold mb-6 text-gray-800"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        My Reserved Books
      </h1>
      {reservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white rounded-lg shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition-shadow"
              style={{ minHeight: '500px' }} // Ensure all cards have the same minimum height
            >
              <div className="flex items-start space-x-4">
                <img
                  src={`http://localhost:3001/${reservation.book.image}`}
                  alt={reservation.book.title}
                  className="w-32 h-48 object-cover rounded-lg shadow-md"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {reservation.book.title}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Author: {reservation.book.author.name}
                    </p>
                    <p className="text-gray-500 mt-2">
                      Genre: {reservation.book.category.name}
                    </p>
                    <p className="text-gray-500">ISBN: {reservation.book.isbn}</p>
                    <p className="text-gray-500">
                      Published:{" "}
                      {new Date(
                        reservation.book.publishedDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mt-4 line-clamp-3">
                      {reservation.book.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Reserved On:{" "}
                      <span className="font-medium">
                        {new Date(
                          reservation.reservationDate
                        ).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          reservation.status === "Active"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Loan Button */}
              {reservation.book.availabilityStatus === "available" && (
                <button
                  onClick={() => handleLoan(reservation.book.id)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
                >
                  Loan Book
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">
          You have no reserved books at the moment.
        </p>
      )}
    </div>
  );
}

export default ReservationsPage;