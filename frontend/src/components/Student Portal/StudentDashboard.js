import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'; // Assuming you're using React Router

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint to fetch student details
    const apiUrl = 'http://localhost:8000/authenticate/student/dashboard/'; // Replace with your API endpoint

    axios.get(apiUrl)
      .then((response) => {
        setStudentData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setLoading(false);
      });
  }, []);

  // Conditionally render the link based on whether student details are available
  const renderDetailsLink = () => {
    if (loading) {
      // Show loading indicator
      return <p>Loading...</p>;
    } else if (Object.keys(studentData).length === 0) {
      // Student details are not filled, render the link to DetailsForm
      return <Link to="/student/detailsform">Fill Student Details</Link>;
    } else {
      // Student details are filled, render a link to view the details
      return <Link to="/student/student-details">View Student Details</Link>;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
        {renderDetailsLink()}
      </div>
    </div>
  );
};

export default StudentDashboard;
