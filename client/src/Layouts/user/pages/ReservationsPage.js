import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../helper/userContext";

function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUser(); // Access the user data
  const userId = user?.user?.id; // Access the ID inside the nested 'user' object

  useEffect(() => {
    fetchReservations();
  }, [userId]);

  const fetchReservations = async () => {
    if (!userId) {
      console.log("Please log in to view your reservations.");
      return;
    }

    console.log("User ID:", userId);

    try {
      // Fetch only the logged-in user's reservations
      const response = await axios.get(
        `http://localhost:3001/reservation/user/${userId}`
      );

      // Check if the book is loaned and update status accordingly
      const updatedReservations = response.data.map((reservation) => {
        const bookStatus = reservation.book.availabilityStatus;
        let status = reservation.status;

        // If the book is borrowed or reserved, update the status to reflect that
        if (bookStatus === "borrowed") {
          status = "Not Available";
        }

        return {
          ...reservation,
          status: status,
        };
      });

      setReservations(updatedReservations);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoan = async (bookId, reservationId) => {
    if (!userId) {
      alert("You must be logged in to loan a book.");
      return;
    }

    setLoading(true);
    try {
      const requestData = { bookId, userId };

      // Step 1: Loan the book
      const loanResponse = await axios.post("http://localhost:3001/loan", requestData);
      if (loanResponse.status === 200) {
        alert("Book loaned successfully!");

        // Step 2: Now delete the reservation after successful loan
        const deleteReservationResponse = await axios.delete(
          `http://localhost:3001/reservation/${reservationId}`
        );
        if (deleteReservationResponse.status === 200) {
          // Step 3: Fetch updated reservations after loan and deletion
          await fetchReservations(); // Refreshes the list after deletion
        } else {
          throw new Error("Failed to delete reservation.");
        }
      } else {
        throw new Error("Failed to loan book.");
      }
    } catch (err) {
      console.error("Error loaning book:", err);
      alert("Failed to loan book.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnreserve = async (reservationId, bookId) => {
    try {
      // First, delete the reservation
      await axios.delete(`http://localhost:3001/reservation/${reservationId}`);
      alert("Reservation cancelled successfully!");

      // Update the book's status to 'available' after unreserving
      await axios.put(`http://localhost:3001/book/${bookId}`, {
        availabilityStatus: 'available'
      });

      // Re-fetch reservations after unreserving
      await fetchReservations();
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
              style={{ minHeight: "500px" }}
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
                          reservation.book.availabilityStatus === "borrowed"
                            ? "text-red-600"
                            : reservation.book.availabilityStatus === "reserved"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {reservation.book.availabilityStatus === "borrowed"
                          ? "Not Available"
                          : reservation.book.availabilityStatus === "reserved"
                          ? "Reserved"
                          : "Available"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Loan Button */}
              {reservation.book.availabilityStatus === "borrowed" ? (
                <button
                  className="mt-14 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed w-full"
                  disabled
                >
                  Not Available for Loan
                </button>
              ) : (
                <button
                  onClick={() => handleLoan(reservation.book.id, reservation.id)}
                  className="mt-14 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
                >
                  Loan Book
                </button>
              )}
              {/* Unreserve Button */}
              <button
                onClick={() => handleUnreserve(reservation.id, reservation.book.id)}
                className="mb-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full"
                disabled={reservation.book.availabilityStatus === "available"}
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
