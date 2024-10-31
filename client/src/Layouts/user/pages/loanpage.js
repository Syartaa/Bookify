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
