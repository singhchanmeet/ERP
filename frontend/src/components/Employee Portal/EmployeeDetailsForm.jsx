import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ErrorPage from '../standard/ErrorPage';
import { useNavigate } from 'react-router-dom';
import InputField from '../standard/InputField';
const EmployeeDetailsForm = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('accessToken');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [employeeDetails, setEmployeeDetails] = useState({
        employee_id: '',
        name: '',
        dob: '',
        fullAddress: '',
        email: '',
        mobileNumber: '',
        gender: '',
        designation: '',
        department: '',
        bloodGroup: '',
        emergencyName: '',
        emergencyNumber: '', passportPhotograph: null,
        aadhar: null,
        pancard: null,
    });

    const [formErrors, setFormErrors] = useState({
        enrollment_number: '',
        ipu_registration_number: '',
        name: '',
        dob: '',
        full_address: '',
        email: '',
        mobile_number: '',
        gender: '',
        category: '',
        region: '',
        father_name: '',
        mother_name: '',
        father_qualification: '',
        mother_qualification: '',
        father_occupation: '',
        mother_occupation: '',
        father_job_designation: '',
        mother_job_designation: '',
        father_business_type: '',
        mother_business_type: '',
        father_mobile_number: '',
        mother_mobile_number: '',
        father_office_address: '',
        mother_office_address: '',
        guardian_name: '',
        board_12th: '',
        year_of_12th: '',
        rollno_12th: '',
        school_12th: '',
        aggregate_12th: '',
        board_10th: '',
        year_of_10th: '',
        rollno_10th: '',
        school_10th: '',
        aggregate_10th: '',
        jee_rank: '',
        jee_percentile: '',
        jee_rollno: '',
        special_achievements: '',
        passport_photograph: '',
        marksheet_10th: '',
        marksheet_12th: '',
        aadhar: '',
        pancard: '',
    });

    useEffect(() => {
        // Fetch the user details from your API
        axios.get('http://localhost:8000/user-details/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`, // Add the token to the 'Authorization' header
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
        axios.get('http://localhost:8000/employee/personal-details/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setEmployeeDetails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [accessToken]);


    if (loading) {
        return <p>Loading... Please wait</p>
    }

    if (!user) {
        return <ErrorPage />
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/employee/personal-details/', employeeDetails, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
            
                const newAccessToken = response.data.access;
                console.log(response.data.access);
                const newRefreshToken = response.data.refresh;

                // Remove existing tokens from local storage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                // Set the new tokens in local storage
                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                console.log(response.data.access);
                setStep(step + 1);

            })
            .catch((error) => {
                // Handle errors, e.g., display an error message.
                console.error('Error submitting form:', error);
            });
    }

    const finalSubmit = () => {

        alert('Your details have been submitted to the Portal');
        navigate('/dashboard')
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeDetails({ ...employeeDetails, [name]: value });
    };

    const handleFileInputChange = (event, fieldName) => {
        const file = event.target.files[0];

        if (file) {
            setEmployeeDetails({ ...employeeDetails, [fieldName]: file });
        } else {
            setEmployeeDetails({ ...employeeDetails, [fieldName]: null });
        }
    };

    const nextStep = (e) => {
        e.preventDefault();

    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className=" p-4 rounded-lg">
                        <h2 className="text-2xl font-semibold border-b-2 pb-4 mb-4 text-blue-700 ">Personal Details</h2>
                        <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Please double-check and make sure your information is correct</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <InputField
                                            name="employee_id"
                                            value={employeeDetails.employee_id}
                                            onChange={handleInputChange}
                                            placeholder="Employee ID"
                                            required
                                        />
                                        {formErrors.employee_id && <p className="error text-red-600 text-sm font-semibold">{formErrors.employee_id}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <InputField
                                            name="name"
                                            value={employeeDetails.name}
                                            onChange={handleInputChange}
                                            placeholder="Name (As registered with the college)"
                                            required
                                        />
                                        {formErrors.name && <p className="error text-red-600 text-sm font-semibold">{formErrors.name}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <InputField
                                            name="dob"
                                            value={employeeDetails.dob}
                                            onChange={handleInputChange}
                                            placeholder="Date of Birth"
                                            required
                                        />
                                        {formErrors.dob && <p className="error text-red-600 text-sm font-semibold">{formErrors.dob}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <InputField
                                            name="fullAddress"
                                            value={employeeDetails.fullAddress}
                                            onChange={handleInputChange}
                                            placeholder="Full Address"
                                            required
                                        />
                                        {formErrors.full_address && <p className="error text-red-600 text-sm font-semibold">{formErrors.full_address}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <InputField
                                            name="email"
                                            value={employeeDetails.email}
                                            onChange={handleInputChange}
                                            placeholder="Email address"
                                            required
                                        />
                                        {formErrors.email && <p className="error text-red-600 text-sm font-semibold">{formErrors.email}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <InputField
                                            name="mobileNumber"
                                            value={employeeDetails.mobileNumber}
                                            onChange={handleInputChange}
                                            placeholder="Mobile Number"
                                            required
                                        />
                                        {formErrors.mobileNumber && <p className="error text-red-600 text-sm font-semibold">{formErrors.mobileNumber}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={employeeDetails.gender}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHERS">Others</option>
                                        </select>
                                        {formErrors.gender && <p className="error text-red-600 text-sm font-semibold">{formErrors.gender}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">
                                            Designation
                                        </label>
                                        <select
                                            id="designation"
                                            name="designation"
                                            value={employeeDetails.designation}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            required
                                        >
                                            <option value="">Select Designation</option>
                                            <option value="Accountant">Accountant</option>
                                            <option value="Admission Counsellor">Admission Counsellor</option>
                                            <option value="Admission Head">Admission Head</option>
                                            <option value="Assistant">Assistant</option>
                                            <option value="Assistant Accountant">Assistant Accountant</option>
                                            <option value="Assistant Hostel Warden">Assistant Hostel Warden</option>
                                            <option value="Assistant Librarian">Assistant Librarian</option>
                                            <option value="Assistant Network Engineer">Assistant Network Engineer</option>
                                            <option value="Assistant Professor">Assistant Professor</option>
                                            <option value="Associate Professor">Associate Professor</option>
                                            <option value="Associate Professor and HoD">Associate Professor and HoD</option>
                                            <option value="Attendant">Attendant</option>
                                            <option value="Chief Account Officer">Chief Account Officer</option>
                                        </select>
                                        {formErrors.designation && <p className="error text-red-600 text-sm font-semibold">{formErrors.designation}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                                            Department
                                        </label>
                                        <select
                                            id="department"
                                            name="department"
                                            value={employeeDetails.department}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                                            <option value="Computer Science and Engineering (Artificial Intelligence and Machine Learning)">Computer Science and Engineering (Artificial Intelligence and Machine Learning)</option>
                                            <option value="Computer Science and Engineering (Artificial Intelligence)">Computer Science and Engineering (Artificial Intelligence)</option>
                                            <option value="Computer Science and Engineering (Data Science)">Computer Science and Engineering (Data Science)</option>
                                            <option value="Information Technology">Information Technology</option>
                                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                                            <option value="Mechanical and Automation Engineering">Mechanical and Automation Engineering</option>
                                        </select>
                                        {formErrors.department && <p className="error text-red-600 text-sm font-semibold">{formErrors.department}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="bloodGroup" className="block text-sm font-medium leading-6 text-gray-900">
                                            Blood Group
                                        </label>
                                        <select
                                            id="bloodGroup"
                                            name="bloodGroup"
                                            value={employeeDetails.bloodGroup}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            required
                                        >
                                            <option value="">select Blood group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                        {formErrors.bloodGroup && <p className="error text-red-600 text-sm font-semibold">{formErrors.bloodGroup}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <InputField
                                            name="emergencyName"
                                            value={employeeDetails.emergencyName}
                                            onChange={handleInputChange}
                                            placeholder="Emergency Contact Name"
                                            required
                                        />
                                        {formErrors.emergencyName && <p className="error text-red-600 text-sm font-semibold">{formErrors.emergencyName}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <InputField
                                            name="emergencyNumber"
                                            value={employeeDetails.emergencyNumber}
                                            onChange={handleInputChange}
                                            placeholder="Emergency Contact Number"
                                            required
                                        />
                                        {formErrors.emergencyNumber && <p className="error text-red-600 text-sm font-semibold">{formErrors.emergencyNumber}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case 2:
                return (
                    <div className=" p-4 rounded-lg">
                        <h2 className="text-2xl font-semibold border-b-2 pb-4 mb-4 text-blue-700 ">Parent Details</h2>
                        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                            <h1 className='text-lg  w-fit px-2 py-1 text-blue-700 font-semibold border-b-2 pb-4'>Father Details</h1>
                            <br />
                            <div className='flex gap-x-5 gap-y-10 flex-wrap '>
                                <div>
                                    <label htmlFor="passport_photograph">Passport Photograph:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="passport_photograph"
                                        name="passport_photograph"
                                        required
                                        onChange={(e) => handleFileInputChange(e, 'passportPhotograph')}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="aadhar">Aadhar Card:</label>
                                    <input
                                        type="file"
                                        accept=".pdf, .jpg, .jpeg, .png"
                                        id="aadhar"
                                        required
                                        name="aadhar"
                                        onChange={(e) => handleFileInputChange(e, 'aadhar')}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="pancard">PAN Card:</label>
                                    <input
                                        type="file"
                                        accept=".pdf, .jpg, .jpeg, .png"
                                        id="pancard"
                                        required
                                        name="pancard"
                                        onChange={(e) => handleFileInputChange(e, 'pancard')}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>

                            </div>
                            <br />
                            
                            <br />
                            <div className="flex justify-between">
                                <button onClick={prevStep} className="text-sm font-semibold leading-6 text-gray-900">
                                    Previous
                                </button>
                                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case 3:
                return (
                    <>
                        <div className=" p-4 rounded-lg">
                            <h2 className="text-2xl font-semibold border-b-2 pb-4 mb-4 text-blue-700 "> Data Submission</h2>
                            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                                {/* Hidden input fields to store the values */}
                                <div>
                                    <label htmlFor="name" className="text-lg font-semibold">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        value={employeeDetails.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="dob" className="text-lg font-semibold">Date of Birth:</label>
                                    <input
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        placeholder="Date of Birth"
                                        value={employeeDetails.dob}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="full_address" className="text-lg font-semibold">Full Address:</label>
                                    <input
                                        type="text"
                                        id="full_address"
                                        name="full_address"
                                        placeholder="Full Address"
                                        value={employeeDetails.full_address}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-lg font-semibold">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={employeeDetails.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mobile_number" className="text-lg font-semibold">Mobile Number:</label>
                                    <input
                                        type="text"
                                        id="mobile_number"
                                        name="mobile_number"
                                        placeholder="Mobile Number"
                                        value={employeeDetails.mobile_number}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="text-lg font-semibold">Gender:</label>
                                    <input
                                        type="text"
                                        id="gender"
                                        name="gender"
                                        placeholder="Gender"
                                        value={employeeDetails.gender}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className="text-lg font-semibold">Category:</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        placeholder="Category"
                                        value={employeeDetails.category}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="region" className="text-lg font-semibold">Region:</label>
                                    <input
                                        type="text"
                                        id="region"
                                        name="region"
                                        placeholder="Region"
                                        value={employeeDetails.region}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="father_name" className="text-lg font-semibold">Father's Name:</label>
                                    <input
                                        type="text"
                                        id="father_name"
                                        name="father_name"
                                        placeholder="Father's Name"
                                        value={employeeDetails.father_name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mother_name" className="text-lg font-semibold">Mother's Name:</label>
                                    <input
                                        type="text"
                                        id="mother_name"
                                        name="mother_name"
                                        placeholder="Mother's Name"
                                        value={employeeDetails.mother_name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="father_qualification" className="text-lg font-semibold">Father's Qualification:</label>
                                    <input
                                        type="text"
                                        id="father_qualification"
                                        name="father_qualification"
                                        placeholder="Father's Qualification"
                                        value={employeeDetails.father_qualification}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mother_qualification" className="text-lg font-semibold">Mother's Qualification:</label>
                                    <input
                                        type="text"
                                        id="mother_qualification"
                                        name="mother_qualification"
                                        placeholder="Mother's Qualification"
                                        value={employeeDetails.mother_qualification}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="board_12th" className="text-lg font-semibold">12th Board:</label>
                                    <input
                                        type="text"
                                        id="board_12th"
                                        name="board_12th"
                                        placeholder="12th Board"
                                        value={employeeDetails.board_12th}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="year_of_12th" className="text-lg font-semibold">Year of Passing (12th):</label>
                                    <input
                                        type="text"
                                        id="year_of_12th"
                                        name="year_of_12th"
                                        placeholder="Year of Passing (12th)"
                                        value={employeeDetails.year_of_12th}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="rollno_12th" className="text-lg font-semibold">12th Roll Number:</label>
                                    <input
                                        type="text"
                                        id="rollno_12th"
                                        name="rollno_12th"
                                        placeholder="12th Roll Number"
                                        value={employeeDetails.rollno_12th}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="school_12th" className="text-lg font-semibold">School Name (12th):</label>
                                    <input
                                        type="text"
                                        id="school_12th"
                                        name="school_12th"
                                        placeholder="School Name (12th)"
                                        value={employeeDetails.school_12th}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="aggregate_12th" className="text-lg font-semibold">Aggregate (12th):</label>
                                    <input
                                        type="text"
                                        id="aggregate_12th"
                                        name="aggregate_12th"
                                        placeholder="Aggregate (12th)"
                                        value={employeeDetails.aggregate_12th}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="jee_rank" className="text-lg font-semibold">JEE Rank:</label>
                                    <input
                                        type="text"
                                        id="jee_rank"
                                        name="jee_rank"
                                        placeholder="JEE Rank"
                                        value={employeeDetails.jee_rank}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="jee_percentile" className="text-lg font-semibold">JEE Percentile:</label>
                                    <input
                                        type="text"
                                        id="jee_percentile"
                                        name="jee_percentile"
                                        placeholder="JEE Percentile"
                                        value={employeeDetails.jee_percentile}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="jee_rollno" className="text-lg font-semibold">JEE Roll Number:</label>
                                    <input
                                        type="text"
                                        id="jee_rollno"
                                        name="jee_rollno"
                                        placeholder="JEE Roll Number"
                                        value={employeeDetails.jee_rollno}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="special_achievements" className="text-lg font-semibold">Special Achievements:</label>
                                    <input
                                        type="text"
                                        id="special_achievements"
                                        name="special_achievements"
                                        placeholder="Special Achievements"
                                        value={employeeDetails.special_achievements}
                                        onChange={handleInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="passport_photograph" className="text-lg font-semibold">Passport Photograph:</label>
                                    <input
                                        type="file"  // Use type="file" for file input
                                        id="passport_photograph"
                                        name="passport_photograph"
                                        onChange={handleFileInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                    {employeeDetails.passport_photograph ? (
                                        <p>Uploaded File: {employeeDetails.passport_photograph.name}</p>
                                    ) : (
                                        <p>Not uploaded</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="marksheet_10th" className="text-lg font-semibold">10th Marksheet:</label>
                                    <input
                                        type="file"  // Use type="file" for file input
                                        id="marksheet_10th"
                                        name="marksheet_10th"
                                        onChange={handleFileInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                    {employeeDetails.marksheet_10th ? (
                                        <p>Uploaded File: {employeeDetails.marksheet_10th.name}</p>
                                    ) : (
                                        <p>Not uploaded</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="marksheet_12th" className="text-lg font-semibold">12th Marksheet:</label>
                                    <input
                                        type="file"
                                        id="marksheet_12th"
                                        name="marksheet_12th"
                                        onChange={handleFileInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                    {employeeDetails.marksheet_12th ? (
                                        <p>Uploaded File: {employeeDetails.marksheet_12th.name}</p>
                                    ) : (
                                        <p>Not uploaded</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="aadhar" className="text-lg font-semibold">Aadhar Card:</label>
                                    <input
                                        type="file"
                                        id="aadhar"
                                        name="aadhar"
                                        onChange={handleFileInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                    {employeeDetails.aadhar ? (
                                        <p>Uploaded File: {employeeDetails.aadhar.name}</p>
                                    ) : (
                                        <p>Not uploaded</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="pancard" className="text-lg font-semibold">PAN Card:</label>
                                    <input
                                        type="file"
                                        id="pancard"
                                        name="pancard"
                                        onChange={handleFileInputChange}
                                        className="w-full p-2 mb-2 rounded border border-gray-300"
                                    />
                                    {employeeDetails.pancard ? (
                                        <p>Uploaded File: {employeeDetails.pancard.name}</p>
                                    ) : (
                                        <p>Not uploaded</p>
                                    )}
                                </div>


                                {/* Add more fields here... */}

                                <div className="flex justify-between">
                                    <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                        Previous
                                    </button>
                                    <button type="submit" onClick={(e) => {
                                        handleFormSubmit(e);
                                        finalSubmit();
                                    }}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Submit
                                    </button>

                                </div>
                            </form>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };
    return (
        <div className="">
            <div className="p-4 w-[90%] mx-auto">
                <h1 className="text-3xl font-bold text-indigo-900 mb-4">Employee Details Form</h1>
                {renderStep()}
            </div>
        </div>
    )
}

export default EmployeeDetailsForm