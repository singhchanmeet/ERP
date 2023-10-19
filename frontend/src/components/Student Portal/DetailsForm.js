import React, { useState } from 'react';

const DetailsForm = () => {
  const [step, setStep] = useState(1);
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    rollNumber: '',
    department: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 1: Personal Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={studentDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 rounded border border-gray-300"
            />
            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              value={studentDetails.rollNumber}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 rounded border border-gray-300"
            />
            <div className="flex justify-between">
              <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 2: Department</h2>
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={studentDetails.department}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 rounded border border-gray-300"
            />
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Previous
              </button>
              <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 3: Review</h2>
            <p>Name: {studentDetails.name}</p>
            <p>Roll Number: {studentDetails.rollNumber}</p>
            <p>Department: {studentDetails.department}</p>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover-bg-gray-600">
                Previous
              </button>
              {/* You can add a submit button here to submit the data */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Student Details Form</h1>
      {renderStep()}
    </div>
  );
};

export default DetailsForm;
