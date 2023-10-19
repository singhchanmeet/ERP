import React, { useEffect } from 'react';
import mslogo from "../../assets/ms_logo.png";
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
    const navigate = useNavigate();
  // Function to initiate the Microsoft login
  const handleLogin = () => {
    // Define the Microsoft login URL
    const microsoftLoginUrl = 'http://localhost:8000/auth/sign_in'; // Replace with the actual Microsoft login URL

    // Redirect the user to the Microsoft login page
    window.location.href = microsoftLoginUrl;
  };

 

  return (
    <div className="container mx-auto mt-8 px-10">
      <h2 className="text-xl font-semibold mb-4">Student Login</h2>
      <button
        onClick={handleLogin}
        className="hover:bg-zinc-200 font-semibold py-2 px-4 border-[1px] border-black my-2"
      >
        <div className='flex items-center'>
          <img src={mslogo} className='w-8' alt="" />
          <p>Sign In with Microsoft</p>
        </div>
      </button>
    </div>
  );
}

export default StudentLogin;
