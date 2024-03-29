import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">An Error Occurred</h2>
        <p className="text-gray-600 text-center mb-6">
          Sorry, an error occurred while processing your request. Please try reloading the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded focus:outline-none w-full mb-4"
        >
          Reload Page
        </button>
        <p className="text-gray-600 text-center">
          You have been logged out due to inactivity. If the problem persists, you can try logging in again.
        </p>
        <Link to="/login">
          <button className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded focus:outline-none w-full mt-4">
            Try Logging In Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
