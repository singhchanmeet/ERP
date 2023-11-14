import React, { useEffect, useState } from 'react';
import StudentNavbar from './StudentNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = ({ user }) => {
  const accessToken = localStorage.getItem('accessToken');
  const [formFilled, setFormFilled] = useState(false);
  useEffect(() => {
    axios.get('https://erp.mait.ac.in/student/personal-details/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.status === 204) {
          // If status is 204, set formFilled to false
          setFormFilled(false);
        } else if (response.data.pancard !== null) {
          // If response.data.pancard is not null, set formFilled to true
          setFormFilled(true);
        } else {
          // In all other cases, set formFilled to false
          setFormFilled(false);
        }
        // Now you can use the formFilled value as needed
        // For example, you can log it or use it in your application logic
        console.log('formFilled:', formFilled);
      })

      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [accessToken, formFilled]);
  return (
    <div className="p-5 bg-slate-300">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-red-600">Student Dashboard</h1>
      </div>

      <table className="table">
        <tbody>
          <tr className="border-b-2 border-gray-500">
            <th className="px-2 py-2 border-r-2 font-semibold">Roll No.</th>
            <td className=" px-2">{user.name}</td>
          </tr>
          <tr className="border-b-2 border-gray-500">
            <th className="py-2 px-2 border-r-2 font-semibold">Your Email</th>
            <td className=" px-2">{user.email}</td>
          </tr>
        </tbody>
      </table>

      <div className="my-4">
        <h1 className=" font-semibold text-violet-600">
          To proceed further and fill the form, please share your details.
        </h1>
      </div>
      {formFilled ? (
        <p>You have already filled the details form. Please wait until further notice.</p>
      ) : (
        <Link to="/student-details-form">
          <button className="border-2 p-1 border-indigo-700 font-mono shadow rounded my-2 text-lg">
            Click Here
          </button>
        </Link>
      )}

      {/* You can add more student details and components as needed */}
    </div>
  );
};

export default StudentDashboard;
