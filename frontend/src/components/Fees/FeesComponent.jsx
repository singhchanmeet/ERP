import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentSidePanel from '../Student Portal/StudentSidePanel';

const FeesComponent = () => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const host = process.env.REACT_APP_BACKEND_URL;
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        axios.get(`${host}/student/personal-details/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setStudentData(response.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [accessToken]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='bg-slate-300 h-[100%]'>

            <div className="p-5  w-[90%] m-auto">
                <div className="mb-8">
                    <Link to={'/dashboard'} ><h1 className="text-xl hover:bg-gray-100 text-blue-900  w-fit p-2 rounded font-semibold bg-gray-200">Student Dashboard</h1></Link>
                </div>
                <div className='flex gap-8'>
                    <div>
                        <StudentSidePanel />
                    </div>
                    <div className="p-4">
                        <h1 className="text-2xl font-bold mb-4">Fees Management</h1>
                        <div className="flex flex-col gap-4">
                        <Link to={'/display-fee'}>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Pay Fees
                                </button>
                            </Link>
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Past Transactions
                            </button>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                View Fees Structure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeesComponent;
