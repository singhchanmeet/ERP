import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';

const SplitPaymentRequests = () => {
  const [splitPayments, setSplitPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/fee/feeroutersplitpayment/`);
        const dataWithStudentNames = await Promise.all(
          response.data.map(async (payment) => {
            return { ...payment };
          })
        );
        setSplitPayments(dataWithStudentNames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching split payments:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAllowSplitPayment = async (id, value) => {
    try {
      await axios.patch(`https://admin.erp.mait.ac.in/fee/feeroutersplitpayment/${id}/`, { allow_split_payment: value });
      const updatedPayments = splitPayments.map((payment) =>
        payment.id === id ? { ...payment, allow_split_payment: value } : payment
      );
      setSplitPayments(updatedPayments);
    } catch (error) {
      console.error('Error updating split payment:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredPayments = splitPayments.filter((payment) =>
    payment.id.toString().includes(searchText)
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pending Split Payment Requests</h1>
      <input
        type="text"
        placeholder="Search by ID"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        value={searchText}
        onChange={handleSearch}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Document 1</th>
            <th className="border border-gray-300 px-4 py-2">Document 2</th>
            <th className="border border-gray-300 px-4 py-2">Document 3</th>
            <th className="border border-gray-300 px-4 py-2">Allow Split Payment</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={payment.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
              <td className="border border-gray-300 px-4 py-2">{payment.id}</td>
              <td className={`border border-gray-300 px-4 py-2 ${payment.document1 ? 'text-blue-500 underline' : ''}`}>
                {payment.document1 ? <a href={payment.document1} target="_blank" rel="noopener noreferrer">Document 1</a> : 'Not Uploaded'}
              </td>
              <td className={`border border-gray-300 px-4 py-2 ${payment.document2 ? 'text-blue-500 underline' : ''}`}>
                {payment.document2 ? <a href={payment.document2} target="_blank" rel="noopener noreferrer">Document 2</a> : 'Not Uploaded'}
              </td>
              <td className={`border border-gray-300 px-4 py-2 ${payment.document3 ? 'text-blue-500 underline' : ''}`}>
                {payment.document3 ? <a href={payment.document3} target="_blank" rel="noopener noreferrer">Document 3</a> : 'Not Uploaded'}
              </td>
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
