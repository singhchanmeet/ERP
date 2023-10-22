import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const StudentNavbar = ({ user}) => {
    const context = useContext(AuthContext);
    const {logoutUser} = context; 
  return (
    <nav className="bg-blue-500 p-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">MAIT</Link>
        <div className="text-white">
          <p className="text-base">Welcome, {user.email}</p>
        </div>
        <div className="space-x-4">
          <Link to="/timetable" className="text-white hover:underline">Timetable</Link>
          <Link to="/schedule" className="text-white hover:underline">Schedule</Link>
          <Link to="/results" className="text-white hover:underline">Results</Link>
          <Link to="/cms" className="text-white hover:underline">CMS/LMS</Link>
          <Link to="/help" className="text-white hover:underline">Help/Support</Link>
          <Link to="/attendance" className="text-white hover:underline">Attendance</Link>
          <button onClick={logoutUser} className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
