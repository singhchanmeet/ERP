import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudentSidePanel from './StudentSidePanel';
import { Link } from 'react-router-dom';

const StudentDetails = () => {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        axios.get('https://admin.erp.mait.ac.in/student/personal-details/', {
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
                    <div>
                        <h3 class="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details</p>
                        <br /><div>

                            <img className='w-[150px]' src={`https://admin.erp.mait.ac.in${studentData.passport_photograph}`} alt="Passport Photograph" />
                        </div>
                        <div>
                            <div class="px-4 sm:px-0">

                            </div>
                            <div class="mt-6 border-t border-gray-100">
                                <dl class="divide-y divide-gray-100">
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Enrollment Number</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{studentData.enrollment_number}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{studentData.name}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Phone</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{studentData.mobile_number}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{studentData.email}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Father's Name</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{studentData.father_name}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">

                                        <dt class="text-sm font-medium leading-6 text-gray-900">Mother's Name</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{studentData.mother_name}</dd>
                                    </div>


                                </dl>
                                <div class="mt-10">
                                    <Link to={'/student-details-form'}><button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Details</button></Link>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
