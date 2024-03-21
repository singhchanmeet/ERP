import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudentSidePanel from '../Student Portal/StudentSidePanel';

const FeesComponent = () => {
    const navigate = useNavigate();
    const [detailsExist, setDetailsExist] = useState(false);
    const [feesStatus, setFeesStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const host = process.env.REACT_APP_BACKEND_URL;
    const accessToken = localStorage.getItem('accessToken');
    const [studentData, setStudentData] = useState(null);
    const fetchDetails = async () => {
        try {
            const response = await fetch(`${host}/student/other-details/`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            // Check if all required details exist in the response
            if (response.ok) {
                if (data.batch !== null && data.branch !== null && data.group !== null) {
                    setDetailsExist(true);
                } else {
                    // Navigate to "/impdetails" if details don't exist
                    navigate("/impdetails");
                }
            }
        } catch (error) {
            console.error('Error fetching details:', error);
            navigate("/impdetails");
        }
    };
    useEffect(() => {
        axios.get(`${host}/fee/paid/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setFeesStatus(response.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
        fetchDetails();
    }, [accessToken]);
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='bg-slate-300 h-[100%]'>

            <div className="p-5  w-[90%] m-auto">
                <div className="mb-8">
                    <Link to={'/dashboard'} ><h1 className="text-xl hover:bg-gray-100 text-blue-900  w-fit p-2 rounded font-semibold bg-gray-200">Student Dashboard</h1></Link>
                </div>
                <div className='flex gap-8 items-center justify-between'>
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
                            <Link to={'/fee-history'}>
                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                    Past Transactions
                                </button>
                            </Link>
                            <Link to={'/fee-structure'}>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    View Fees Structure
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='w-96'>
                        <h1 className='text-xl '>Fees Status</h1>
                        {feesStatus && (
                            <p className={`text-lg font-semibold ${feesStatus.paid === 'half' ? 'text-yellow-500' :
                                feesStatus.paid ? 'text-green-500' :
                                    'text-red-500'
                                }`}>
                                {feesStatus.split ? 'Applied for split payment' : ' '} -
                                {feesStatus.paid === 'half' ? 'Paid half' : feesStatus.paid ? 'Paid full' : 'Not paid'}
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeesComponent;
