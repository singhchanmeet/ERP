// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import axios from 'axios';
import EmployeeNavbar from '../Employee Portal/EmployeeNavbar';
import StudentNavbar from '../Student Portal/StudentNavbar';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        // Fetch the user details from your API
        axios.get('http://localhost:8000/user-details/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`, // Add the token to the 'Authorization' header
                'Content-Type': 'application/json', // Adjust headers as needed
            },
        })
            .then((response) => {
                // Assuming the API response contains user data
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [accessToken]);


    if (!user) {
        return (<nav className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
            <div className="text-xl font-semibold">
                <Link to="/">College ERP</Link>
            </div>
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                </li>
                <li>
                    <Link to="/employee" className="hover:text-gray-400">Employee</Link>
                </li>
                <li>
                    <Link to="/student" className="hover:text-gray-400">Student</Link>
                </li>
                <li>
                    <Link to="/about" className="hover:text-gray-400">About</Link>
                </li>
            </ul>
        </div>
    </nav>)
    }

    // Determine the user's role
    const userRole = user.role;
    if (userRole === 'STUDENT'){
        return (
            <StudentNavbar user={user}/>
        )
    }
    if(userRole==='EMPLOYEE'){
        return(
            <>
            <EmployeeNavbar/>
            </>
        )
    }
    else{
        return(
            <nav className="bg-gray-900 text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-xl font-semibold">
                        <Link to="/">College ERP</Link>
                    </div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:text-gray-400">Home</Link>
                        </li>
                        <li>
                            <Link to="/employee" className="hover:text-gray-400">Employee</Link>
                        </li>
                        <li>
                            <Link to="/student" className="hover:text-gray-400">Student</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-gray-400">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;
