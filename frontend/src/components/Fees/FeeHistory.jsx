// FeeHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeeHistory = () => {
  const [feeHistory, setFeeHistory] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Fetch fee payment history from the server
    axios.get(`${host}/fee/history/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      setFeeHistory(response.data);
    })
    .catch(error => console.error(error));
  }, [accessToken]); // Dependency array ensures this effect runs whenever accessToken changes

  const handlePrint = (transaction) => {
    // Open a new window and print the transaction details
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html><head><title>Transaction Details</title></head><body>`);
    printWindow.document.write(`<h2>Transaction Details</h2>`);
    printWindow.document.write(`<p><strong>Student Enrollment Number:</strong> ${transaction.enrollment_number}</p>`);
    printWindow.document.write(`<p><strong>Order ID:</strong> ${transaction.order_id}</p>`);
    printWindow.document.write(`<p><strong>Transaction ID:</strong> ${transaction.transaction_id}</p>`);
    printWindow.document.write(`<p><strong>Transaction Amount:</strong> ${transaction.transaction_amount}</p>`);
    printWindow.document.write(`<p><strong>Transaction Status:</strong> ${transaction.transaction_status}</p>`);
    printWindow.document.write(`<p><strong>Payment Method:</strong> ${transaction.payment_method}</p>`);
    printWindow.document.write(`<p><strong>Transaction Time:</strong> ${new Date(transaction.transaction_time).toLocaleString()}</p>`);
    // Add more details as needed
    printWindow.document.write(`</body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Fee Payment History</h2>

      {feeHistory.length === 0 ? (
        <p>No fee payment history available.</p>
      ) : (
        <table className="w-full border-collapse border-2 border-black mb-8">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 py-2 px-4">Student Enrollment Number</th>
              <th className="border border-gray-400 py-2 px-4">Order ID</th>
              <th className="border border-gray-400 py-2 px-4">Transaction ID</th>
              <th className="border border-gray-400 py-2 px-4">Transaction Amount</th>
              <th className="border border-gray-400 py-2 px-4">Transaction Status</th>
              <th className="border border-gray-400 py-2 px-4">Payment Method</th>
              <th className="border border-gray-400 py-2 px-4">Transaction Time</th>
              {/* Add more headers as needed */}
              <th className="border border-gray-400 py-2 px-4">Print</th>
            </tr>
          </thead>
          <tbody>
            {feeHistory.map(transaction => (
              <tr key={transaction.id}>
                <td className="border border-gray-400 py-2 px-4">{transaction.enrollment_number}</td>
                <td className="border border-gray-400 py-2 px-4">{transaction.order_id}</td>
                <td className="border border-gray-400 py-2 px-4">{transaction.transaction_id}</td>
                <td className="border border-gray-400 py-2 px-4">{transaction.transaction_amount}</td>
                <td className="border border-gray-400 py-2 px-4">{transaction.transaction_status}</td>
                <td className="border border-gray-400 py-2 px-4">{transaction.payment_method}</td>
                <td className="border border-gray-400 py-2 px-4">{new Date(transaction.transaction_time).toLocaleString()}</td>
                {/* Add more data cells as needed */}
                <td className="border border-gray-400 py-2 px-4">
                  <button
                    onClick={() => handlePrint(transaction)}
                    className="p-2 bg-blue-500 text-white border-none cursor-pointer"
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeeHistory;
