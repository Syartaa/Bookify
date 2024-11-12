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
      if (!userId) {
        console.log("Please log in to view your reservations.");
        return;
      }

      console.log("User ID:", userId); 
  
      try {
        // Fetch only the logged-in user's reservations
        const response = await axios.get(`http://localhost:3001/reservation/user/${userId}`);
        setReservations(response.data);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReservations();
  }, [userId]);
  

  const handleLoan = async (bookId) => {
  // Ensure userId is available
  if (!userId) {
    alert("You must be logged in to loan a book.");
    return;
  }

  console.log("Book ID:", bookId);  // Log bookId to ensure it's passed correctly
  console.log("User ID:", userId);  // Log userId to ensure it's passed correctly

  const requestData = { bookId, userId };
  console.log('Sending loan request with data:', requestData); // Log request data

  setLoading(true); // Set loading state to true before making the request

  try {
    const response = await axios.post("http://localhost:3001/loan", requestData);
    alert("Book loaned successfully!");

    // Remove the loaned book from reservations
    const updatedReservations = reservations.filter(
      (reservation) => reservation.book.id !== bookId
    );
    setReservations(updatedReservations);  // Update the state with the new reservations

  } catch (err) {
    console.error("Error loaning book:", err);
    alert("Failed to loan book.");
  } finally {
    setLoading(false); // Set loading state back to false after the request completes
  }
};


  const handleUnreserve = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:3001/reservation/${reservationId}`);
      alert("Reservation cancelled successfully!");

      // Fetch updated reservations after unreserving
      const response = await axios.get("http://localhost:3001/reservation");
      setReservations(response.data);
    } catch (err) {
      console.error("Error cancelling reservation:", err);
      alert("Failed to cancel reservation.");
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
    <div className="max-w-5xl mx-auto p-6 ">
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
              style={{ minHeight: '500px' }}
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
                      {new Date(reservation.book.publishedDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mt-4 line-clamp-3">
                      {reservation.book.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Reserved On:{" "}
                      <span className="font-medium">
                        {new Date(reservation.reservationDate).toLocaleDateString()}
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
              <button
                onClick={() => handleLoan(reservation.book.id)}
                className="mt-14 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                Loan Book
              </button>

              {/* Unreserve Button */}
              <button
                onClick={() => handleUnreserve(reservation.id)}
                className="mb-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full"
              >
                Unreserve Book
              </button>
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
