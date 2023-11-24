import React from 'react';
import { Link } from 'react-router-dom';

const StudentSidePanel = () => {
    const handleButtonClick = () => {
        alert('Functionality under development');
    };

    return (
        <div className="bg-gray-200 p-4">
            <ul>
                <li className="mb-2">
                    <Link to={'/student-details'} className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100">Your Details</Link>
                </li>
                <li className="mb-2">
                    <Link className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={handleButtonClick}>Timetable</Link>
                </li>
                <li className="mb-2">
                    <Link className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={handleButtonClick}>Schedule</Link>
                </li>
                <li className="mb-2">
                    <Link className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={handleButtonClick}>Results</Link>
                </li>
                <li className="mb-2">
                    <Link className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={handleButtonClick}>CMS/LMS</Link>
                </li>
                <li className="mb-2">
                    <Link className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={handleButtonClick}>Help/Support</Link>
                </li>
                <li className="mb-2">
                    <Link className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={handleButtonClick}>Attendance</Link>
                </li>
            </ul>
        </div>
    );
};

export default StudentSidePanel;
