import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false); // For fine payment loading state
  const user = useUser(); // Access the user data
  const userId = user?.user?.id;

  useEffect(() => {
    const fetchLoans = async () => {
      if (!userId) {
        alert("Please log in to view your reservations.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/loan?userId=${userId}`);
        setLoans(response.data);
      } catch (err) {
        setError('Could not fetch loans');
        console.error('Error fetching loans:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [userId]); // Make sure to re-fetch if userId changes

  const handlePayFine = async (loanId) => {
    setPaymentLoading(true); // Show loading state for the fine payment

    try {
      // Call the API to pay the fine
      const response = await axios.put(`http://localhost:3001/fine/pay/${loanId}`);
      
      // Update the loan list to reflect the payment
      setLoans((prevLoans) => {
        return prevLoans.map((loan) => {
          if (loan.id === loanId) {
            loan.fineStatus = 'paid'; // Update the fine status to 'paid'
            loan.status = 'completed'; // Optionally, update loan status to 'completed'
          }
          return loan;
        });
      });

      alert(response.data.message); // Show success message
    } catch (err) {
      console.error('Error paying fine:', err);
      alert('Failed to pay the fine. Please try again.');
    } finally {
      setPaymentLoading(false); // Hide loading state after request is complete
    }
  };

  if (loading) return <p>Loading loans...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">Loan Records</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white border rounded-lg">
            <thead>
              <tr className="bg-pink-300 text-white">
                <th className="py-3 px-4 text-left font-medium">Loan ID</th>
                <th className="py-3 px-4 text-left font-medium">Book Title</th>
                <th className="py-3 px-4 text-left font-medium">Borrower</th>
                <th className="py-3 px-4 text-left font-medium">Borrow Date</th>
                <th className="py-3 px-4 text-left font-medium">Due Date</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Fine Status</th>
                <th className="py-3 px-4 text-left font-medium">Pay Fine</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id} className="border-b hover:bg-pink-50">
                  <td className="py-3 px-4 text-gray-600">{loan.id}</td>
                  <td className="py-3 px-4 text-gray-600">{loan.book?.title}</td>
                  <td className="py-3 px-4 text-gray-600">{loan.user?.name}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(loan.borrowDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(loan.dueDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`py-3 px-4 text-center font-semibold rounded-full w-24 mx-auto ${
                      loan.status === 'borrowed'
                        ? 'bg-orange-200 text-orange-500'
                        : loan.status === 'returned'
                        ? 'bg-green-200 text-green-600'
                        : 'bg-red-200 text-red-600'
                    }`}
                  >
                    {loan.status}
                  </td>
                  <td
                    className={`py-3 px-4 text-center font-semibold rounded-full w-24 mx-auto ${
                      loan.fineStatus === 'unpaid'
                        ? 'bg-red-200 text-red-600'
                        : 'bg-green-200 text-green-600'
                    }`}
                  >
                    {loan.fineStatus === 'unpaid' ? `Fine: $${loan.fineAmount}` : 'No Fine'}
                  </td>
                  <td className="py-3 px-4">
                    {loan.fineStatus === 'unpaid' && loan.status === 'returned' && (
                      <button
                        onClick={() => handlePayFine(loan.id)}
                        disabled={paymentLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                      >
                        {paymentLoading ? 'Processing...' : 'Pay Fine'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanPage;
