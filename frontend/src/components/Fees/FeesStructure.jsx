// DisplayFees.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeesStructure = () => {
  const [fees, setFees] = useState({});
  const [totalAmount, setTotalAmount] = useState(0.0);
  const accessToken = localStorage.getItem('accessToken');
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Fetch data from the server
    axios.get(`${host}/fee/display/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        // Format fees to two decimal places
        const formattedFees = {};
        Object.keys(response.data).forEach(feeType => {
          formattedFees[feeType] = parseFloat(response.data[feeType]).toFixed(2);
        });
        setFees(formattedFees);
      })
      .catch(error => console.error(error));
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleCheckboxChange = (feeType) => {
    // You can remove this function since it's not needed for your requirement
  };

  return (
    <div className="container mx-auto mt-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Fee payment Structure</h2>

        <table className="w-full border-collapse border-2 border-black mb-8">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 py-2 px-4">Fee Type</th>
              <th className="border border-gray-400 py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(fees).map(([feeType, amount]) => (
              <tr key={feeType}>
                <td className="border border-gray-400 py-2 px-4">{feeType}</td>
                <td className="border border-gray-400 py-2 px-4">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

    
      </div>
    </div>
  );
};

export default FeesStructure;
