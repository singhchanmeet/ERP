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
          <div>
            <h2>Step 1: Personal Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={studentDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              value={studentDetails.rollNumber}
              onChange={handleInputChange}
            />
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Department</h2>
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={studentDetails.department}
              onChange={handleInputChange}
            />
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Step 3: Review</h2>
            <p>Name: {studentDetails.name}</p>
            <p>Roll Number: {studentDetails.rollNumber}</p>
            <p>Department: {studentDetails.department}</p>
            <button onClick={prevStep}>Previous</button>
            {/* You can add a submit button here to submit the data */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Student Details Form</h1>
      {renderStep()}
    </div>
  );
};

export default DetailsForm;
