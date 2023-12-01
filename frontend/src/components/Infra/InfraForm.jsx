import React, { useEffect, useState } from 'react';
import ErrorPage from '../standard/ErrorPage';
import axios from 'axios';
import InfraNavbar from './InfraNavbar';

const InfraForm = () => {
    const [formData, setFormData] = useState({
        department: '',
        collegeName: '',
        roomCategory: '',
        roomNumber: '',
        item: '',
        yearOfPurchase: '',
        numberOfUnits: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic for form submission here
        console.log('Form submitted:', formData);
    };
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('accessToken');
    // let [authToken, setAuthToken] = useState(()=> localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null)

    //   useEffect(() => {
    //     // Fetch the user details from your API
    //     axios.get('http://localhost:8000/user-details/', {
    //       headers: {
    //         'Authorization': `Bearer ${accessToken}`, // Add the token to the 'Authorization' header
    //         'Content-Type': 'application/json', // Adjust headers as needed
    //       }
    //     })
    //       .then((response) => {
    //         // Assuming the API response contains user data
    //         setUser(response.data);
    //         setLoading(false)
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching user data:', error);
    //         setLoading(false)
    //       });
    //   }, [accessToken]);

    //   if (loading) {
    //     return <p>Loading... Please wait</p>
    //   }

    //   if (!user) {
    //     return <ErrorPage />
    //   }
    return (
        <>
            <InfraNavbar/>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">Assets Adding Form</h2>
                </div>

                <form className="mt-8 w-[300px] m-auto space-y-6" onSubmit={handleSubmit}>
                    <div className='sm:col-span-3'>
                        <label htmlFor="department" className="block text-sm font-medium leading-5 text-gray-700">
                            Department
                        </label>
                        <select
                            id="department"
                            name="department"
                            onChange={handleInputChange}
                            value={formData.department}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="">Select Department</option>
                            <option value="IT">Information Technology</option>
                            <option value="HR">Human Resources</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="collegeName" className="block text-sm font-medium leading-5 text-gray-700">
                            College Name
                        </label>
                        <select
                            id="collegeName"
                            name="collegeName"
                            onChange={handleInputChange}
                            value={formData.collegeName}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="">Select College Name</option>
                            <option value="MAIT">Maharaja Agrasen Institute of Technology (MAIT)</option>
                            <option value="MAIMS">Maharaja Agrasen Institute of Management Studies (MAIMS)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="roomCategory" className="block text-sm font-medium leading-6 text-gray-900">
                            Room Category
                        </label>
                        <select
                            id="roomCategory"
                            name="roomCategory"
                            onChange={handleInputChange}
                            value={formData.roomCategory}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="">Select Room Category</option>
                            <option value="Faculty Room">Faculty Room</option>
                            <option value="Lab">Lab</option>
                            <option value="Lecture Room">Lecture Room</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="roomNumber" className="block text-sm font-medium leading-5 text-gray-700">
                            Room Number
                        </label>
                        <input
                            id="roomNumber"
                            name="roomNumber"
                            type="text"
                            onChange={handleInputChange}
                            value={formData.roomNumber}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div>
                        <label htmlFor="item" className="block text-sm font-medium leading-5 text-gray-700">
                            Item
                        </label>
                        <select
                            id="item"
                            name="item"
                            onChange={handleInputChange}
                            value={formData.item}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="">Select Item</option>
                            <option value="PCs">PCs</option>
                            <option value="UPS Batteries">UPS Batteries</option>
                            <option value="CPUs">CPUs</option>
                            <option value="Keyboards">Keyboards</option>
                            <option value="Mice">Mice</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="numberOfUnits" className="block text-sm font-medium leading-5 text-gray-700">
                            Number of Units
                        </label>
                        <input
                            id="numberOfUnits"
                            name="numberOfUnits"
                            type="text"
                            onChange={handleInputChange}
                            value={formData.numberOfUnits}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div>
                        <label htmlFor="yearOfPurchase" className="block text-sm font-medium leading-5 text-gray-700">
                            Year of Purchase
                        </label>
                        <input
                            id="yearOfPurchase"
                            name="yearOfPurchase"
                            type="text"
                            onChange={handleInputChange}
                            value={formData.yearOfPurchase}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        />
                    </div>


                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default InfraForm;
