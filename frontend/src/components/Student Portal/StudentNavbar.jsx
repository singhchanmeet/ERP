import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import the hamburger icon
import AuthContext from '../../context/auth/authContext';

const StudentNavbar = ({ user }) => {
  const context = useContext(AuthContext);
  const { logoutUser } = context;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 p-2 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-bold mr-4">MAIT</Link>
          <p className="text-white text-base">Welcome, {user.email}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          {/* Hamburger menu icon */}
          <button onClick={toggleMenu} className="text-white sm:hidden">
            <FaBars />
          </button>
          {/* Responsive menu */}
          {menuOpen && (
            <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/timetable" className="text-white hover:underline">Timetable</Link>
              <Link to="/schedule" className="text-white hover:underline">Schedule</Link>
              <Link to="/results" className="text-white hover:underline">Results</Link>
              <Link to="/cms" className="text-white hover:underline">CMS/LMS</Link>
              <Link to="/help" className="text-white hover:underline">Help/Support</Link>
              <Link to="/attendance" className="text-white hover:underline">Attendance</Link>
              <button onClick={logoutUser} className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
