// LoanPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:3001/loan');
        setLoans(response.data);
      } catch (err) {
        setError('Could not fetch loans');
        console.error('Error fetching loans:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) return <p>Loading loans...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Loan Records</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-pink-200 text-white">
              <th className="py-4 px-6 text-left font-semibold">Loan ID</th>
              <th className="py-4 px-6 text-left font-semibold">Book Title</th>
              <th className="py-4 px-6 text-left font-semibold">Borrower</th>
              <th className="py-4 px-6 text-left font-semibold">Borrow Date</th>
              <th className="py-4 px-6 text-left font-semibold">Due Date</th>
              <th className="py-4 px-6 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6 text-gray-700">{loan.id}</td>
                <td className="py-4 px-6 text-gray-700">{loan.book?.title}</td>
                <td className="py-4 px-6 text-gray-700">{loan.user?.name}</td>
                <td className="py-4 px-6 text-gray-700">
                  {new Date(loan.borrowDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-gray-700">
                  {new Date(loan.dueDate).toLocaleDateString()}
                </td>
                <td
                  className={`py-4 px-6 text-center font-semmibold rounded-full ${
                    loan.status === 'borrowed'
                      ? 'bg-orange-200 text-orange-400'
                      : loan.status === 'returned'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {loan.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanPage;
