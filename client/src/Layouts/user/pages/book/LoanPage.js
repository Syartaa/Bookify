import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../../helper/userContext'; // Assuming you have the useUser hook for accessing user data

const LoanPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUser(); // Get the logged-in user
  const userId = user?.user?.id; // Access the user ID from the user object

  useEffect(() => {
    
  
    fetchLoans();
  }, [userId]);

  const fetchLoans = async () => {
    if (!userId) {
      console.log("Please log in to view your reservations.");
      return;
    }

    console.log("User ID:", userId); 

    try {
      // Fetch only the logged-in user's reservations
      const response = await axios.get(`http://localhost:3001/loan/user/${userId}`);
      setLoans(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching loans:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (loanId) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    try {
      const returnDate = new Date().toISOString().slice(0, 10); // Current date as return date
      const response = await axios.put(`http://localhost:3001/loan/${loanId}`, { returnDate }, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token with the request
        },
      });
      alert(response.data.fine ? response.data.fine : 'Book returned successfully');
      fetchLoans(); // Refresh the loans after returning
    } catch (error) {
      console.error('Error returning loan:', error);
      alert('Could not return the book.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Loans</h1>

      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {loans.map((loan) => (
            <div key={loan.id} className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">{loan.book.title}</h2>
              <p>
                <span className="font-bold">Due Date:</span> {new Date(loan.dueDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-bold">Return Date:</span>{' '}
                {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : 'Not returned'}
              </p>

              {loan.returnDate ? (
                <p className="text-green-500 font-bold">Book Returned</p>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={() => handleReturn(loan.id)}
                >
                  Return Book
                </button>
              )}

              {loan.fine && (
                <p className="text-red-500 font-bold mt-2">
                  Fine: ${loan.fine.amount} (Status: {loan.fine.paymentStatus})
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanPage;
