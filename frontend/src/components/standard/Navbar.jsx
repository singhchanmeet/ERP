import React, { useEffect, useState } from 'react';
import ErrorPage from './ErrorPage';
import axios from 'axios';
import EmployeeNavbar from '../Employee Portal/EmployeeNavbar';
import StudentNavbar from '../Student Portal/StudentNavbar';

const Navbar = ({user}) => {
    // const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // const [retryCount, setRetryCount] = useState(0);
    const host = process.env.REACT_APP_BACKEND_URL;

    // useEffect(() => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     const fetchUserDetails = () => {
    //         axios.get(`${host}/user-details/`, {
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //             .then((response) => {
    //                 setUser(response.data);
    //                 setIsLoading(false);
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching user data:', error.response);
    //                 if (error.response.status === 401) {
    //                     setTimeout(() => {
    //                         setRetryCount(retryCount + 1);
    //                         fetchUserDetails();
    //                     }, 5000);
    //                 } else if (retryCount < 5) {
    //                     setTimeout(() => {
    //                         setRetryCount(retryCount + 1);
    //                         fetchUserDetails();
    //                     }, 5000);
    //                 } else {
    //                     setIsLoading(false);
    //                 }
    //             });
    //     };
    //     fetchUserDetails();
    // }, [host, retryCount]);

    if (!user) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return (
            <nav className="">

            </nav>
        );
    }

    const userRole = user.role;
    if (userRole === 'STUDENT') {
        return <StudentNavbar user={user} />;
    }

    else if (userRole === 'EMPLOYEE') {
        return <EmployeeNavbar />;
    } else {
        return <ErrorPage message="Unknown user role." />;
    }
};

export default Navbar;
