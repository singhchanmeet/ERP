import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDashboard from '../Student Portal/StudentDashboard';
import EmployeeDashboard from '../Employee Portal/EmployeeDashboard';
import ErrorPage from './ErrorPage';
import Navbar from './Navbar';
const Dashboard = ({ loggedin, handleLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken');
  const host = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    // Fetch the user details from your API
    axios.get(`${host}/user-details/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, 
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        // Assuming the API response contains user data
        setUser(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false)
      });
  }, [accessToken]);

  if (loading) {
    return <p>Loading... Please wait</p>
  }

  if (!user) {
    return <ErrorPage />
  }

  // Determine the user's role
  const userRole = user.role;

  return (
    <div className=''>
      <Navbar user={user} loggedin={loggedin} handleLogout={handleLogout} />
      {/* <h2 className='text-2xl py-3 ml-10 font-mono'>Welcome,<span className=' font-semibold text-red-600'> {user.username}!</span></h2> */}
      {/* Render the appropriate dashboard based on the user's role */}
      {userRole === 'STUDENT' && <StudentDashboard user={user} loggedin={loggedin} handleLogout={handleLogout} />}
      {userRole === 'EMPLOYEE' && <EmployeeDashboard user={user} loggedin={loggedin} handleLogout={handleLogout} />}
      {/* {userRole === 'UNIVERSITY' && <AnalyticDashboard userRole={userRole} loggedin={loggedin} handleLogout={handleLogout}/>} */}
    </div>
  );
};

export default Dashboard;
