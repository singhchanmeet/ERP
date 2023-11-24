// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import axios from 'axios';
import EmployeeNavbar from '../Employee Portal/EmployeeNavbar';
import StudentNavbar from '../Student Portal/StudentNavbar';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Contact', href: '#' },
  ];

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        // Fetch the user details from your API
        axios.get('http://localhost:8000/user-details/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setUser(response.data);
                setIsLoading(false); // Set loading to false once user data is available
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setIsLoading(false); // Set loading to false in case of an error
            });
    }, [accessToken]);

    if (isLoading) {
        // Show a loading state or spinner
        return <div>Loading...</div>;
    }

    if (!user) {
        return (
            <nav className="">
                
            </nav>
        );
    }

    // Determine the user's role
    const userRole = user.role;
    if (userRole === 'STUDENT') {
        return <StudentNavbar user={user} />;
    }

    if (userRole === 'EMPLOYEE') {
        return <EmployeeNavbar />;
    } else {
        return <ErrorPage message="Unknown user role." />;
    }
};

export default Navbar;
