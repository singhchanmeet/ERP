import React, { useContext } from 'react';
import mslogo from "../../assets/ms_logo.png";
import AuthContext from '../../context/auth/authContext';

function StudentLogin() {
  // Function to initiate the Microsoft login
  const context = useContext(AuthContext);
  const {handleLogin} = context; 
 

  return (
    <div className="container mx-auto mt-8 px-10 h-screen">
      <h2 className="text-xl font-semibold mb-4">Login Page</h2>
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
