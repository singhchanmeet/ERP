import React, { useEffect, useState } from 'react';
import ErrorPage from '../standard/ErrorPage';
import axios from 'axios';
import InfraNavbar from './InfraNavbar';

const InfraForm = () => {
    const [formData, setFormData] = useState({
        department: '',
        institute: '',
        room_category: '',
        room_number: '',
        item_type: '',
        year_of_purchase: '',
        numberOfUnits: '',
        status: '',
    });

    const [dropdownData, setDropdownData] = useState(null);
    const [loadingDropdown, setLoadingDropdown] = useState(true);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://admin.erp.mait.ac.in/infra/submit-form/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    // You may include additional headers as needed
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Form submission failed');
            }

            // Assuming the backend responds with data after successful submission
            const responseData = await response.json();

            alert('Assets Added!!');

            // Reset the form data to a blank state
            setFormData({
                department: '',
                institute: '',
                room_category: '',
                room_number: '',
                item_type: '',
                year_of_purchase: '',
                numberOfUnits: '',
                status: ''
            });

        } catch (error) {
            console.error('Form submission error:', error);
            // Handle errors, show an error message, etc.
        }
    };

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('accessToken');
    // let [authToken, setAuthToken] = useState(()=> localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null)


    useEffect(() => {
        // Fetch the user details from your API
        axios.get('https://admin.erp.mait.ac.in/user-details/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json', // Adjust headers as needed
            }
        })
            .then((response) => {
                // Assuming the API response contains user data
                setUser(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setLoading(false)
            });
    }, [accessToken]);
    useEffect(() => {
        axios.get('https://admin.erp.mait.ac.in/infra/dropdown-data/')
            .then((response) => {
                setDropdownData(response.data);
                setLoadingDropdown(false);
            })
            .catch((error) => {
                console.error('Error fetching dropdown data:', error);
                setLoadingDropdown(false);
            });
    }, []);
    if (loading) {
        return <p>Loading... Please wait</p>
    }


    if (!user) {
        return <ErrorPage />
    }



    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">Assets Adding Form</h2>
                </div>

                <form className="mt-8 w-[300px] m-auto space-y-6" onSubmit={handleSubmit}>

                    <div className="sm:col-span-3">
                        <label htmlFor="institute" className="block text-sm font-medium leading-5 text-gray-700">
                            College Name
                        </label>
                        <select
                            id="institute"
                            name="institute"
                            onChange={handleInputChange}
                            value={formData.institute}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="">Select College Name</option>
                            {dropdownData.institute.map((inst) => (
                                <option key={inst} value={inst}>
                                    {inst}
                                </option>
                            ))}
                        </select>
                    </div>


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
                            {dropdownData.department.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>



                    <div>
                        <label htmlFor="room_category" className="block text-sm font-medium leading-6 text-gray-900">
                            Room Category
                        </label>
                        <select
                            id="room_category"
                            name="room_category"
                            onChange={handleInputChange}
                            value={formData.room_category}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="">Select Room Category</option>
                            {dropdownData.room_category.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="room_number" className="block text-sm font-medium leading-5 text-gray-700">
                            Room Number
                        </label>
                        <input
                            id="room_number"
                            name="room_number"
                            type="text"
                            onChange={handleInputChange}
                            value={formData.room_number}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div>
                        <label htmlFor="item_type" className="block text-sm font-medium leading-5 text-gray-700">
                            Item
                        </label>
                        <select
                            id="item_type"
                            name="item_type"
                            onChange={handleInputChange}
                            value={formData.item_type}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="">Select Item type</option>
                            {dropdownData.item_type.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium leading-5 text-gray-700">
                            Item Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            onChange={handleInputChange}
                            value={formData.status}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value="1">Active/Working</option>
                            <option value="0">Not Working/Faulty</option>
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
                        <label htmlFor="year_of_purchase" className="block text-sm font-medium leading-5 text-gray-700">
                            Year of Purchase
                        </label>
                        <input
                            id="year_of_purchase"
                            name="year_of_purchase"
                            type="text"
                            onChange={handleInputChange}
                            value={formData.year_of_purchase}
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
