import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = ({ user }) => {
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
    <div className='p-5 bg-slate-300 '>
      <h1 className='text-2xl'>Student Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <br />
          <table className="table">
            <tbody className=''>
              <tr className='text-left border-[1px] border-black'>
                <th className="px-2 py-2 border-r-[1px] text-xl font-semibold border-black">Roll No.</th>
                <td className="text-xl px-2">{user.name}</td>
              </tr>
              <tr className='text-left border-[1px] border-black'>
                <th className="py-2 px-2 border-r-[1px] text-xl font-semibold border-black">Your Email</th>
                <td className="text-xl px-2">{user.email}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <h1 className='text-lg font-bold text-violet-600'>Please Share Your details to proceed further and fill the form</h1>
          <button className='border-[2px] p-1  border-indigo-700 font-mono shadow rounded my-2  text-lg'>Click Here</button>
          {/* Add more student details here */}
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
