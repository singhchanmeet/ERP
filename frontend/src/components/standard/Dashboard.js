import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDashboard from '../Student Portal/StudentDashboard';
import EmployeeDashboard from '../Employee Portal/EmployeeDashboard';
import ErrorPage from './ErrorPage';
const Dashboard = ({ loggedin, handleLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken');
  // let [authToken, setAuthToken] = useState(()=> localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null)

  useEffect(() => {
    // Fetch the user details from your API
    axios.get('http://localhost:8000details/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Add the token to the 'Authorization' header
        'Content-Type': 'application/json', // Adjust headers as needed
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
      {/* <h2 className='text-2xl py-3 ml-10 font-mono'>Welcome,<span className=' font-semibold text-red-600'> {user.username}!</span></h2> */}
      {/* Render the appropriate dashboard based on the user's role */}
      {userRole === 'STUDENT' && <StudentDashboard user={user} loggedin={loggedin} handleLogout={handleLogout} />}
      {userRole === 'EMPLOYEE' && <EmployeeDashboard user={user} loggedin={loggedin} handleLogout={handleLogout} />}
      {/* {userRole === 'UNIVERSITY' && <AnalyticDashboard userRole={userRole} loggedin={loggedin} handleLogout={handleLogout}/>} */}
    </div>
  );
};

export default Dashboard;
