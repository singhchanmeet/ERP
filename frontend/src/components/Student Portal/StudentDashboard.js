import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>Student Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{studentData.name}</h2>
          <p>Roll Number: {studentData.rollNumber}</p>
          <p>Department: {studentData.department}</p>
          {/* Add more student details here */}
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
