// DisplayFees.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayFees = () => {
  const navigate = useNavigate();
  const [fees, setFees] = useState({});
  const [selectedFees, setSelectedFees] = useState({});
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [hasApplied, setHasApplied] = useState(false); // New state for checking if user has applied for split payment
  const [hasBeenApproved, setHasBeenApproved] = useState(false); // New state for checking if user has been approved for split payment
  const [feesPaid, setFeesPaid] = useState(false); // New state for checking if user has been approved for split payment
  const accessToken = localStorage.getItem('accessToken');
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Check if the user has applied for split payment
    axios.get(`${host}/fee/split-payment/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if (response.status === 204) {
          // No content, set hasApplied to false
          setHasApplied(false);
        } else if (response.status === 200) {
          // Content received, check if split payment is allowed
          const { allow_split_payment } = response.data;
          setHasApplied(true);

          if (allow_split_payment) {
            setHasBeenApproved(true);
          }
        }
      })
      .catch(error => console.error(error));
  }, []); // Empty dependency array ensures this effect runs only once on component mount

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
  useEffect(() => {
    // Check if the fees are paid for the current year
    axios.get(`${host}/fee/paid/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if (response.status === 200 && response.data.paid === true) {
          // Fees are paid for this year
          setFeesPaid(true);
        } else {
          // Fees are not paid for this year
          setFeesPaid(false);
        }
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
      const response = await axios.post(`${host}/fee/create_billdesk_order/`, postData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Handle response based on status
      if (response.status === 200) {
        console.log(response.data);

        const { merchantId, bdOrderId, authToken } = response.data; // Directly destructure properties
        sessionStorage.setItem('merchantId', merchantId);
        sessionStorage.setItem('bdOrderId', bdOrderId);
        sessionStorage.setItem('authToken', authToken);

        navigate('/pay-fee');
      } else {
        console.error(response.data);
        // Additional logic for other response statuses
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitHalf = async () => {
    // Prepare data for the POST request for half fees
    const selectedFeeTypes = Object.entries(selectedFees)
      .filter(([_, isSelected]) => isSelected)
      .map(([feeType, _]) => feeType);

    const postData = {
      total_amount: (totalAmount / 2).toFixed(2), // Set total amount to half
      // selectedFees: selectedFeeTypes,
    };

    // Send POST request with authorization header for half fees
    try {
      const response = await axios.post(`${host}/fee/create_billdesk_order/`, postData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Handle response based on status
      if (response.status === 200) {
        console.log(response.data);

        const { merchantId, bdOrderId, authToken } = response.data; // Directly destructure properties
        sessionStorage.setItem('merchantId', merchantId);
        sessionStorage.setItem('bdOrderId', bdOrderId);
        sessionStorage.setItem('authToken', authToken);

        navigate('/pay-fee');
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
      {feesPaid ? (
        <div className="bg-green-200 p-4 mb-4">
          Fees for this year have been paid.
        </div>
      ) : (
        <>
          {hasApplied && !hasBeenApproved && (
            <div className="bg-yellow-200 p-4 mb-4">
              Your request to pay split fees has been sent. Please wait for approval from the accounts department.
            </div>
          )}

          {!hasApplied && (
            <button onClick={() => navigate('/split-payment')} className="p-2 bg-blue-500 text-white mb-4">
              Apply for Split Payment
            </button>
          )}

          {hasBeenApproved ? (
            <div>
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
                <button onClick={handleSubmit} className="p-4 bg-green-500 text-white border-none cursor-pointer">
                  Pay Full Fee
                </button>
                <button
                  onClick={handleSubmitHalf} // Use the new handleSubmitHalf function
                  className="p-4 bg-yellow-500 text-white border-none cursor-pointer ml-4"
                >
                  Pay Half Fee
                </button>
              </div>
            </div>
          ) : (
            // Default behavior for displaying fees
            <div>
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
                <button onClick={handleSubmit} className="p-4 bg-green-500 text-white border-none cursor-pointer">
                  Proceed to Pay
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DisplayFees;
