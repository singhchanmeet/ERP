import React, { useState } from 'react';

const DetailsForm = () => {
  const [step, setStep] = useState(1);
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    rollNumber: '',
    department: '',
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    rollNumber: '',
    department: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (studentDetails.name.length < 6) {
      setFormErrors({
        username: 'Name must be at least 6 characters long.',
      });
    } else {
      // Handle the form submission here
      alert('Form submitted!');
      setFormErrors({
        username: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };
  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];

    if (file) {
      setStudentDetails({ ...studentDetails, [fieldName]: file });
    } else {
      // Handle the case where the user clears the file input
      setStudentDetails({ ...studentDetails, [fieldName]: null });
    }
  };
  const nextStep = (e) => {
    e.preventDefault();
    if (studentDetails.name === "hello") {
      setFormErrors({
        username: 'Name must be at least 6 characters long.',
      });
    } else {
      setStep(step + 1);
      setFormErrors({
        username: '',
      });
    }
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
            <form onSubmit={nextStep}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={studentDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={studentDetails.dob}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="full_address"
                  placeholder="Full Address"
                  value={studentDetails.full_address}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={studentDetails.email}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mobile_number"
                  placeholder="Mobile Number"
                  value={studentDetails.mobile_number}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={studentDetails.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={studentDetails.category}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="region"
                  placeholder="Region"
                  value={studentDetails.region}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </form>
          </div>
        );

      case 2:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 2: Parent Details</h2>
            <form onSubmit={nextStep}>
              <div>
                <input
                  type="text"
                  name="father_name"
                  placeholder="Father's Name"
                  value={studentDetails.father_name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_name"
                  placeholder="Mother's Name"
                  value={studentDetails.mother_name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_qualification"
                  placeholder="Father's Qualification"
                  value={studentDetails.father_qualification}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_qualification"
                  placeholder="Mother's Qualification"
                  value={studentDetails.mother_qualification}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_occupation"
                  placeholder="Father's Occupation"
                  value={studentDetails.father_occupation}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_occupation"
                  placeholder="Mother's Occupation"
                  value={studentDetails.mother_occupation}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_job_designation"
                  placeholder="Father's Job Designation"
                  value={studentDetails.father_job_designation}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_job_designation"
                  placeholder="Mother's Job Designation"
                  value={studentDetails.mother_job_designation}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_business_type"
                  placeholder="Father's Business Type"
                  value={studentDetails.father_business_type}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_business_type"
                  placeholder="Mother's Business Type"
                  value={studentDetails.mother_business_type}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_mobile_number"
                  placeholder="Father's Mobile Number"
                  value={studentDetails.father_mobile_number}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_mobile_number"
                  placeholder="Mother's Mobile Number"
                  value={studentDetails.mother_mobile_number}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_office_address"
                  placeholder="Father's Office Address"
                  value={studentDetails.father_office_address}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_office_address"
                  placeholder="Mother's Office Address"
                  value={studentDetails.mother_office_address}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="guardian_name"
                  placeholder="Guardian's Name"
                  value={studentDetails.guardian_name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Previous
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 3: 10th and 12th Results</h2>
            <form onSubmit={nextStep}>
              <p>Name: {studentDetails.name}</p>
              <p>Roll Number: {studentDetails.rollNumber}</p>
              <p>Department: {studentDetails.department}</p>

              {/* 12th Class Details */}
              <div>
                <input
                  type="text"
                  name="board_12th"
                  placeholder="12th Board"
                  value={studentDetails.board_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="year_of_12th"
                  placeholder="Year of Passing (12th)"
                  value={studentDetails.year_of_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="rollno_12th"
                  placeholder="12th Roll Number"
                  value={studentDetails.rollno_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="school_12th"
                  placeholder="School Name (12th)"
                  value={studentDetails.school_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="aggregate_12th"
                  placeholder="Aggregate (12th)"
                  value={studentDetails.aggregate_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>

              {/* 10th Class Details */}
              <div>
                <input
                  type="text"
                  name="board_10th"
                  placeholder="10th Board"
                  value={studentDetails.board_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="year_of_10th"
                  placeholder="Year of Passing (10th)"
                  value={studentDetails.year_of_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="rollno_10th"
                  placeholder="10th Roll Number"
                  value={studentDetails.rollno_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="school_10th"
                  placeholder="School Name (10th)"
                  value={studentDetails.school_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="aggregate_10th"
                  placeholder="Aggregate (10th)"
                  value={studentDetails.aggregate_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>

              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover-bg-gray-600">
                  Previous
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </form>
          </div>
        );

      case 4:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 4: JEE Details and Achievements</h2>
            <form onSubmit={nextStep}>
              <div>
                <input
                  type="number"
                  name="jee_rank"
                  placeholder="JEE Rank"
                  value={studentDetails.jee_rank}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="jee_percentile"
                  placeholder="JEE Percentile"
                  value={studentDetails.jee_percentile}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="jee_rollno"
                  placeholder="JEE Roll Number"
                  value={studentDetails.jee_rollno}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="special_achievements"
                  placeholder="Special Achievements"
                  value={studentDetails.special_achievements}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover-bg-gray-600">
                  Previous
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 5:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 5: Upload Images and Files</h2>
            <form onSubmit={nextStep}>
              <div>
                <label htmlFor="passport_photograph">Passport Photograph:</label>
                <input
                  type="file"
                  accept="image/*"
                  id="passport_photograph"
                  name="passport_photograph"
                  onChange={(e) => handleFileInputChange(e, 'passport_photograph')}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <label htmlFor="marksheet_10th">10th Marksheet:</label>
                <input
                  type="file"
                  id="marksheet_10th"
                  name="marksheet_10th"
                  onChange={(e) => handleFileInputChange(e, 'marksheet_10th')}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <label htmlFor="marksheet_12th">12th Marksheet:</label>
                <input
                  type="file"
                  id="marksheet_12th"
                  name="marksheet_12th"
                  onChange={(e) => handleFileInputChange(e, 'marksheet_12th')}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <label htmlFor="aadhar">Aadhar Card:</label>
                <input
                  type="file"
                  id="aadhar"
                  name="aadhar"
                  onChange={(e) => handleFileInputChange(e, 'aadhar')}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <label htmlFor="pancard">PAN Card:</label>
                <input
                  type="file"
                  id="pancard"
                  name="pancard"
                  onChange={(e) => handleFileInputChange(e, 'pancard')}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover-bg-gray-600">
                  Previous
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </form>
          </div>
        );

      case 6:
        return (
          <>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Step 6: Data Submission</h2>
              <form onSubmit={handleFormSubmit}>
                {/* Hidden input fields to store the values */}
                <div>
                  <label htmlFor="name" className="text-lg font-semibold">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={studentDetails.name}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="rollNumber" className="text-lg font-semibold">Roll Number:</label>
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={studentDetails.rollNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="text-lg font-semibold">Department:</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="Department"
                    value={studentDetails.department}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="text-lg font-semibold">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    placeholder="Date of Birth"
                    value={studentDetails.dob}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="full_address" className="text-lg font-semibold">Full Address:</label>
                  <input
                    type="text"
                    id="full_address"
                    name="full_address"
                    placeholder="Full Address"
                    value={studentDetails.full_address}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-lg font-semibold">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={studentDetails.email}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="mobile_number" className="text-lg font-semibold">Mobile Number:</label>
                  <input
                    type="text"
                    id="mobile_number"
                    name="mobile_number"
                    placeholder="Mobile Number"
                    value={studentDetails.mobile_number}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="text-lg font-semibold">Gender:</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    placeholder="Gender"
                    value={studentDetails.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="text-lg font-semibold">Category:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Category"
                    value={studentDetails.category}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="region" className="text-lg font-semibold">Region:</label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    placeholder="Region"
                    value={studentDetails.region}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="father_name" className="text-lg font-semibold">Father's Name:</label>
                  <input
                    type="text"
                    id="father_name"
                    name="father_name"
                    placeholder="Father's Name"
                    value={studentDetails.father_name}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="mother_name" className="text-lg font-semibold">Mother's Name:</label>
                  <input
                    type="text"
                    id="mother_name"
                    name="mother_name"
                    placeholder="Mother's Name"
                    value={studentDetails.mother_name}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="father_qualification" className="text-lg font-semibold">Father's Qualification:</label>
                  <input
                    type="text"
                    id="father_qualification"
                    name="father_qualification"
                    placeholder="Father's Qualification"
                    value={studentDetails.father_qualification}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="mother_qualification" className="text-lg font-semibold">Mother's Qualification:</label>
                  <input
                    type="text"
                    id="mother_qualification"
                    name="mother_qualification"
                    placeholder="Mother's Qualification"
                    value={studentDetails.mother_qualification}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="board_12th" className="text-lg font-semibold">12th Board:</label>
                  <input
                    type="text"
                    id="board_12th"
                    name="board_12th"
                    placeholder="12th Board"
                    value={studentDetails.board_12th}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="year_of_12th" className="text-lg font-semibold">Year of Passing (12th):</label>
                  <input
                    type="text"
                    id="year_of_12th"
                    name="year_of_12th"
                    placeholder="Year of Passing (12th)"
                    value={studentDetails.year_of_12th}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="rollno_12th" className="text-lg font-semibold">12th Roll Number:</label>
                  <input
                    type="text"
                    id="rollno_12th"
                    name="rollno_12th"
                    placeholder="12th Roll Number"
                    value={studentDetails.rollno_12th}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="school_12th" className="text-lg font-semibold">School Name (12th):</label>
                  <input
                    type="text"
                    id="school_12th"
                    name="school_12th"
                    placeholder="School Name (12th)"
                    value={studentDetails.school_12th}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="aggregate_12th" className="text-lg font-semibold">Aggregate (12th):</label>
                  <input
                    type="text"
                    id="aggregate_12th"
                    name="aggregate_12th"
                    placeholder="Aggregate (12th)"
                    value={studentDetails.aggregate_12th}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="jee_rank" className="text-lg font-semibold">JEE Rank:</label>
                  <input
                    type="text"
                    id="jee_rank"
                    name="jee_rank"
                    placeholder="JEE Rank"
                    value={studentDetails.jee_rank}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="jee_percentile" className="text-lg font-semibold">JEE Percentile:</label>
                  <input
                    type="text"
                    id="jee_percentile"
                    name="jee_percentile"
                    placeholder="JEE Percentile"
                    value={studentDetails.jee_percentile}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="jee_rollno" className="text-lg font-semibold">JEE Roll Number:</label>
                  <input
                    type="text"
                    id="jee_rollno"
                    name="jee_rollno"
                    placeholder="JEE Roll Number"
                    value={studentDetails.jee_rollno}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="special_achievements" className="text-lg font-semibold">Special Achievements:</label>
                  <input
                    type="text"
                    id="special_achievements"
                    name="special_achievements"
                    placeholder="Special Achievements"
                    value={studentDetails.special_achievements}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="passport_photograph" className="text-lg font-semibold">Passport Photograph:</label>
                  <input
                    type="text"
                    id="passport_photograph"
                    name="passport_photograph"
                    placeholder="Passport Photograph"
                    value={studentDetails.passport_photograph ? studentDetails.passport_photograph.name : 'Not uploaded'}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="marksheet_10th" className="text-lg font-semibold">10th Marksheet:</label>
                  <input
                    type="text"
                    id="marksheet_10th"
                    name="marksheet_10th"
                    placeholder="10th Marksheet"
                    value={studentDetails.marksheet_10th ? studentDetails.marksheet_10th.name : 'Not uploaded'}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="marksheet_12th" className="text-lg font-semibold">12th Marksheet:</label>
                  <input
                    type="text"
                    id="marksheet_12th"
                    name="marksheet_12th"
                    placeholder="12th Marksheet"
                    value={studentDetails.marksheet_12th ? studentDetails.marksheet_12th.name : 'Not uploaded'}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="aadhar" className="text-lg font-semibold">Aadhar Card:</label>
                  <input
                    type="text"
                    id="aadhar"
                    name="aadhar"
                    placeholder="Aadhar Card"
                    value={studentDetails.aadhar ? studentDetails.aadhar.name : 'Not uploaded'}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="pancard" className="text-lg font-semibold">PAN Card:</label>
                  <input
                    type="text"
                    id="pancard"
                    name="pancard"
                    placeholder="PAN Card"
                    value={studentDetails.pancard ? studentDetails.pancard.name : 'Not uploaded'}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>

                {/* Add more fields here... */}

                <div className="flex justify-between">
                  <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Previous
                  </button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
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
