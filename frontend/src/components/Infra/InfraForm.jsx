import React, { useEffect, useState } from 'react';
import ErrorPage from '../standard/ErrorPage';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InfraForm = () => {
    const [formData, setFormData] = useState({
        department: '',
        institute: '',
        room_category: '',
        room_number: '',
        item_type: '',
        year_of_purchase: '',
        numberOfUnits: '1',
        status: '',
        invoice: null,
    });

    // State variables for filtered dropdown data
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [filteredRoomNumbers, setFilteredRoomNumbers] = useState([]);

    // Update departments based on selected institute
    const handleInstituteChange = (e) => {
        const selectedInstitute = e.target.value;
        const departmentsForInstitute = dropdownData['institute-departments'][selectedInstitute] || [];
        setFormData(prevData => ({ ...prevData, institute: selectedInstitute, department: '' }));
        setFilteredDepartments(departmentsForInstitute);
        setFilteredRoomNumbers([]);
    };

    // Update room numbers based on selected department
    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        const roomsForDepartment = dropdownData['departments-rooms'][selectedDepartment] || [];
        setFormData(prevData => ({ ...prevData, department: selectedDepartment, room_number: '' }));
        setFilteredRoomNumbers(roomsForDepartment);
    };

    const [dropdownData, setDropdownData] = useState(null);
    const [loadingDropdown, setLoadingDropdown] = useState(true);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, invoice: file }));
    };
    const host = process.env.REACT_APP_BACKEND_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const response = await axios.post(`${host}/infra/submit-form/`, formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status !== 200) {
                throw new Error('Form submission failed');
            }

            // Assuming the backend responds with data after successful submission
            const responseData = response.data;

            alert('Assets Added!!');

            // Reset the form data to a blank state
            setFormData({
                department: '',
                institute: '',
                room_category: '',
                room_number: '',
                item_type: '',
                year_of_purchase: '',
                numberOfUnits: '1',
                status: '',
                invoice: null,
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
        axios.get(`${host}/user-details/`, {
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
        axios.get(`${host}/infra/dropdown-data/`)
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

    if (loadingDropdown) {
        return <p>Loading... Please wait</p>
    }


    if (!user) {
        return <ErrorPage />
    }



    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 bg-zinc-100">

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className=" text-center text-2xl font-bold font-poppins leading-9 text-orange-600 flex gap-2 items-center"><Link className='' to={'/manage-infra'}>
                        <button
                            className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <FaArrowLeft className="text-white" />
                        </button>
                    </Link><p className='w-full'>Asset Registration and Numbering Form</p></h2>
                </div>
                <form className="mt-8 w-[300px] sm:w-[600px] m-auto space-y-6" onSubmit={handleSubmit}>

                    <div className='flex sm:flex-row justify-between  flex-col'>
                        <div className='space-y-6'>


                            <div className="sm:col-span-3">
                                <label htmlFor="institute" className="block text-sm font-medium leading-5 text-gray-700 mb-2 ">
                                    Institute Name
                                </label>
                                {/* <select
                                    id="institute"
                                    name="institute"
                                    onChange={handleInputChange}
                                    required
                                    value={formData.institute}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="all">All</option>
                                    {dropdownData.institute.map((inst) => (
                                        <option key={inst} value={inst}>
                                            {inst}
                                        </option>
                                    ))}
                                </select> */}
                                <select
                                    id="institute"
                                    name="institute"
                                    onChange={handleInstituteChange}
                                    required
                                    value={formData.institute}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                // ... (other attributes remain the same)
                                >
                                    <option value="">Select Institute</option>
                                    {dropdownData.institute.map((inst) => (
                                        <option key={inst} value={inst}>
                                            {inst}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className='sm:col-span-3'>
                                <label htmlFor="department" className="block text-sm font-medium leading-5 text-gray-700 mb-2">
                                    Department Name
                                </label>
                                {/* <select
                                    id="department"
                                    name="department"
                                    onChange={handleInputChange}
                                    value={formData.department}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="">All</option>
                                    {dropdownData.department.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select> */}
                                <select
                                    id="department"
                                    name="department"
                                    onChange={handleDepartmentChange}
                                    required
                                    value={formData.department}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                // ... (other attributes remain the same)
                                >
                                    <option value="">Select Department</option>
                                    {filteredDepartments.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>



                            <div className='sm:col-span-3'>
                                <label htmlFor="room_category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Room Category
                                </label>
                                <select
                                    id="room_category"
                                    name="room_category"
                                    onChange={handleInputChange}
                                    value={formData.room_category}
                                    required
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

                            <div className='sm:col-span-3'>
                                <label htmlFor="room_number" className="block text-sm font-medium leading-5 text-gray-700 mb-2">
                                    Room Number
                                </label>
                                {/* <input */}
                                {/* id="room_number"
                                    name="room_number"
                                    type="text"
                                    onChange={handleInputChange}
                                    value={formData.room_number}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                /> */}
                                {/* <select
                                    id="room_number"
                                    name="room_number"
                                    onChange={handleInputChange}
                                    required
                                    value={formData.room_number}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="all">All</option>
                                    {dropdownData.room_number.map((inst) => (
                                        <option key={inst} value={inst}>
                                            {inst}
                                        </option>
                                    ))}
                                </select> */}
                                <select
                                    id="room_number"
                                    name="room_number"
                                    onChange={handleInputChange}
                                    required
                                    value={formData.room_number}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                // ... (other attributes remain the same)
                                >
                                    <option value="">Select Room Number</option>
                                    {filteredRoomNumbers.map((room) => (
                                        <option key={room} value={room}>
                                            {room}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='sm:col-span-3'>
                                <label htmlFor="item_type" className="block text-sm font-medium leading-5 text-gray-700 mb-2">
                                    Item Type
                                </label>
                                <select
                                    id="item_type"
                                    name="item_type"
                                    onChange={handleInputChange}
                                    value={formData.item_type}
                                    required
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



                        </div>
                        <br />
                        <div className='space-y-6'>



                            <div className='sm:col-span-3'>
                                <label htmlFor="status" className="block text-sm font-medium leading-5 text-gray-700 mb-2">
                                    Item Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    onChange={handleInputChange}
                                    value={formData.status}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="1">Active/Working</option>
                                    <option value="0">Not Working/Faulty</option>
                                </select>
                            </div>
                            <div className='sm:col-span-3'>
                                <label htmlFor="numberOfUnits" className="block text-sm font-medium leading-5 text-gray-700 mb-2">
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
                            <div className="mt-3">
                                <label htmlFor="invoice" className="block text-sm font-medium text-gray-700">
                                    Bill/Invoice Copy (optional)
                                </label>

                                <div className="mt-1 flex items-center">
                                    <input
                                        id="invoice"
                                        name="invoice"
                                        type="file"
                                        accept=".pdf, .doc, .docx"
                                        onChange={handleFileChange}
                                        className="p-2 border rounded-md font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className='sm:col-span-3'>
                                <label htmlFor="year_of_purchase" className="block text-sm font-medium leading-5 text-gray-700 mb-2">
                                    Year of Purchase (optional)
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
                        </div>
                    </div>
                    <br />
                    <div className='w-[200px] m-auto'>

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