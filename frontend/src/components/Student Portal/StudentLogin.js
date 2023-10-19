import React, { useContext, useEffect } from 'react';
import mslogo from "../../assets/ms_logo.png";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

function StudentLogin() {
    const navigate = useNavigate();
  // Function to initiate the Microsoft login
  const context = useContext(AuthContext);
  const {handleLogin} = context; 
 

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
