import React, { useState, useEffect } from 'react';

const DetailsForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data for the current step from the backend when the component mounts
    fetchFormData();
  }, [step]);

  const fetchFormData = async () => {
    try {
      const response = await fetch(`/api/form-data/${step}`); // Replace with your backend API endpoint
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
      setLoading(false);
    }
  };

  const handleNext = async () => {
    // Send the formData to the backend for saving before moving to the next step
    try {
      const response = await fetch(`/api/save-form-data/${step}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successfully saved data, proceed to the next step
        setStep(step + 1);
      } else {
        // Handle errors
        console.error('Error saving form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  // Render your form fields based on the step and formData

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Send the formData to the backend for saving
    try {
      const response = await fetch('/api/save-student-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        console.log('Student details saved successfully!');
      } else {
        // Handle errors
        console.error('Error saving student details:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving student details:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Student Details Form</h2>
        <div className="mb-6">
          {step === 1 && (
            <>
              <h3 className="text-lg font-medium">Step 1: Personal Information</h3>
              <label className="block mt-2">First Name:</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full mt-1 p-2 border rounded"
              />
              {/* Other personal information fields */}
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-lg font-medium">Step 2: Contact Information</h3>
              <label className="block mt-2">Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mt-1 p-2 border rounded"
              />
              {/* Other contact information fields */}
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="text-lg font-medium">Step 3: Additional Information</h3>
              {/* Additional information fields */}
            </>
          )}

          {step === 4 && (
            <>
              <h3 className="text-lg font-medium">Step 4: Review and Submit</h3>
              {/* Display a summary of entered data for review */}
            </>
          )}
        </div>

        <div className="flex justify-between">
          {step !== 1 && (
            <button onClick={handlePrevious} className="px-4 py-2 bg-gray-500 text-white rounded">
              Previous
            </button>
          )}

          {step !== 4 ? (
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
