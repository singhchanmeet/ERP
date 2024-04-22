// SplitPayment.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SplitPayment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    application: '',
    document1: null,
    document2: null,
    document3: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for handling multipart/form-data
    const formDataObj = new FormData();
    formDataObj.append('application', formData.application);

    // Add documents to FormData if they are uploaded
    if (formData.document1) {
      formDataObj.append('document1', formData.document1);
    }
    if (formData.document2) {
      formDataObj.append('document2', formData.document2);
    }
    if (formData.document3) {
      formDataObj.append('document3', formData.document3);
    }

    const accessToken = localStorage.getItem('accessToken');
    const host = process.env.REACT_APP_BACKEND_URL;

    try {
      const response = await axios.post(`${host}/fee/split-payment/`, formDataObj, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response based on status
      if (response.status === 201) {
        console.log(response.data);
        // Additional logic if needed
        alert('Application Submitted Successfully');
        // Redirect to the DisplayFees component after successful submission
        navigate('/display-fee');
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
      <h2 className="text-2xl font-bold mb-4">Apply for Split Payment</h2>

      <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="application" className="block text-sm font-medium text-gray-700">
            Application*
          </label>
          <input
            type="text"
            id="application"
            name="application"
            value={formData.application}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="document1" className="block text-sm font-medium text-gray-700">
            Document 1
          </label>
          <input
            type="file"
            id="document1"
            name="document1"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="document2" className="block text-sm font-medium text-gray-700">
            Document 2
          </label>
          <input
            type="file"
            id="document2"
            name="document2"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="document3" className="block text-sm font-medium text-gray-700">
            Document 3
          </label>
          <input
            type="file"
            id="document3"
            name="document3"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="p-4 bg-green-500 text-white border-none cursor-pointer hover:bg-green-600"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default SplitPayment;
