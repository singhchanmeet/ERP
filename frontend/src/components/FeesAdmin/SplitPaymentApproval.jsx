import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SplitPaymentRequests = () => {
  const [splitPayments, setSplitPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSplitPayments();
  }, []);

  const fetchSplitPayments = async () => {
    try {
      const response = await axios.get('https://admin.erp.mait.ac.in/fee/feeroutersplitpayment/');
      setSplitPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching split payments:', error);
      setLoading(false);
    }
  };

  const handleAllowSplitPayment = async (id, value) => {
    try {
      await axios.patch(`https://admin.erp.mait.ac.in/fee/feeroutersplitpayment/`, { allow_split_payment: value });
      // Optionally update local state or display a success message
    } catch (error) {
      console.error('Error updating split payment:', error);
      // Handle error appropriately
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pending Split Payment Requests</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Document 1</th>
            <th className="border border-gray-300 px-4 py-2">Document 2</th>
            <th className="border border-gray-300 px-4 py-2">Document 3</th>
            <th className="border border-gray-300 px-4 py-2">Allow Split Payment</th>
          </tr>
        </thead>
        <tbody>
          {splitPayments.map((payment) => (
            <tr key={payment.id}>
              <td className="border border-gray-300 px-4 py-2">{payment.student_name}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.document1 ? 'Uploaded' : 'Not Uploaded'}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.document2 ? 'Uploaded' : 'Not Uploaded'}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.document3 ? 'Uploaded' : 'Not Uploaded'}</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="checkbox"
                  checked={payment.allow_split_payment}
                  onChange={(e) => handleAllowSplitPayment(payment.id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SplitPaymentRequests;
