import StudentContext from './studentContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentState = (props) => {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_BACKEND_URL;
  const studentDetailsInitial = []; // Rename 'creds' to 'studentDetails'
  const [studentDetails, setStudentDetails] = useState(studentDetailsInitial);

  useEffect(() => {
    // Fetch existing student details with a GET request
    async function fetchStudentDetails() {
      try {
        const response = await axios.get(`${host}/student/personal-details`);
        setStudentDetails(response.data); // Updated to 'studentDetails'
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    }

    fetchStudentDetails();
  }, []);

  // Handle saving new student details with a POST request
  const handleSave = async (newDetails) => {
    try {
      const response = await axios.post(`${host}/student/personal-details`, newDetails);
      // Handle the response or perform any necessary actions upon successful save
      console.log('Details saved:', response.data);
      // You can navigate to another page after saving if needed
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving student details:', error);
      // Handle errors or show an error message to the user
    }
  };

  // Include the student state
  const contextValue = {
    studentDetails, // Updated to 'studentDetails'
    handleSave,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
