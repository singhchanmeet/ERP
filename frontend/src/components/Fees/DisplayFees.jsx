// DisplayFees.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayFees = () => {
  const [fees, setFees] = useState({});
  const [selectedFees, setSelectedFees] = useState({});
  const [totalAmount, setTotalAmount] = useState(0.0);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    // Fetch data from the server
    axios.get('http://localhost:8000/fee/display/', {
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
  }, []);

  const handleCheckboxChange = (feeType) => {
    const updatedSelectedFees = { ...selectedFees, [feeType]: !selectedFees[feeType] };
    setSelectedFees(updatedSelectedFees);

    // Calculate total amount
    const newTotalAmount = Object.entries(updatedSelectedFees)
      .filter(([_, isSelected]) => isSelected)
      .reduce((sum, [feeType, _]) => sum + parseFloat(fees[feeType]), 0);

    setTotalAmount(newTotalAmount.toFixed(2));
  };

  const handleSubmit = async () => {
    // Prepare data for the POST request
    const selectedFeeTypes = Object.entries(selectedFees)
      .filter(([_, isSelected]) => isSelected)
      .map(([feeType, _]) => feeType);

    const postData = {
      total_amount: totalAmount,
      // selectedFees: selectedFeeTypes,
    };

    // Send POST request with authorization header
    try {
      const response = await axios.post('http://localhost:8000/fee/create_billdesk_order/', postData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Handle response based on status
      if (response.status === 200) {
        console.log(response.data);
        // Additional logic for successful response
      } else {
        console.error(response.data);
        // Additional logic for other response statuses
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Select the fee payment you would like to make</h2>

      <table className="w-full border-collapse border-2 border-black mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 py-2 px-4">Fee Type</th>
            <th className="border border-gray-400 py-2 px-4">Amount</th>
            <th className="border border-gray-400 py-2 px-4">Select</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(fees).map(([feeType, amount]) => (
            <tr key={feeType} className={selectedFees[feeType] ? 'bg-green-200' : ''}>
              <td className="border border-gray-400 py-2 px-4">{feeType}</td>
              <td className="border border-gray-400 py-2 px-4">{amount}</td>
              <td className="border border-gray-400 py-2 px-4">
                <input
                  type="checkbox"
                  checked={selectedFees[feeType] || false}
                  onChange={() => handleCheckboxChange(feeType)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="font-bold" id="total-amount">
        Total Amount: {totalAmount}
      </div>

      <div className="mt-8 text-center">
        <button onClick={handleSubmit} className="p-4 bg-green-500 text-white border-none cursor-pointer">Proceed to Pay</button>
      </div>
    </div>
  );
};

export default DisplayFees;
