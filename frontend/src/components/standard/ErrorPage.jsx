import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-semibold text-red-600 mb-4">An Error Occurred</h2>
      <p className="text-gray-600 text-center mb-6">
        Sorry, an error occurred while processing your request.
      </p>
      <Link to="/login">
        <button className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded focus:outline-none">
          Try Logging In Again
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
