import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ErrorPage from '../standard/ErrorPage';
import { useNavigate } from 'react-router-dom';
import InputField from '../standard/InputField';
const DetailsForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState({
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
    year_of_12th: null,
    rollno_12th: null,
    school_12th: '',
    aggregate_12th: null,
    board_10th: '',
    year_of_10th: null,
    rollno_10th: null,
    school_10th: '',
    aggregate_10th: null,
    jee_rank: null,
    jee_percentile: null,
    jee_rollno: '',
    special_achievements: '',
    passport_photograph: null, // For file/image upload, use 'null' or initialize with a default value as needed.
    marksheet_10th: null,
    marksheet_12th: null,
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
  const host = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    // Fetch the user details from your API
    axios.get(`${host}/user-details/`, {
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
    axios.get(`${host}/student/personal-details/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        setStudentDetails(response.data);
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

    // Create a variable to track validation status for the current step
    let isStepValid = true;

    // Create an object to store form errors for the current step
    const newFormErrors = {};

    // Define a function to validate fields for the current step
    const validateStepFields = (stepFields) => {
      Object.keys(stepFields).forEach((key) => {
        if (typeof stepFields[key] === 'string' && stepFields[key].trim() === '' && stepFields[key] === null) {
          newFormErrors[key] = 'This field is required';
          isStepValid = false;
        }
      });
    };

    // Use a switch case to determine the current step and validate its fields
    switch (step) {
      case 1:
        validateStepFields({
          name: studentDetails.name,
          dob: studentDetails.dob,
          full_address: studentDetails.full_address,
          email: studentDetails.email,
          mobile_number: studentDetails.mobile_number,
          gender: studentDetails.gender,
          category: studentDetails.category,
          region: studentDetails.region,
        });
        break;
      case 2:
        validateStepFields({
          father_name: studentDetails.father_name,
          mother_name: studentDetails.mother_name,
          father_qualification: studentDetails.father_qualification,
          mother_qualification: studentDetails.mother_qualification,
          father_occupation: studentDetails.father_occupation,
          mother_occupation: studentDetails.mother_occupation,
          father_job_designation: studentDetails.father_job_designation,
          mother_job_designation: studentDetails.mother_job_designation,
          father_business_type: studentDetails.father_business_type,
          mother_business_type: studentDetails.mother_business_type,
          father_mobile_number: studentDetails.father_mobile_number,
          mother_mobile_number: studentDetails.mother_mobile_number,
          father_office_address: studentDetails.father_office_address,
          mother_office_address: studentDetails.mother_office_address,
          guardian_name: studentDetails.guardian_name,
        });
        break;
      case 3:
        validateStepFields({
          board_12th: studentDetails.board_12th,
          year_of_12th: studentDetails.year_of_12th,
          rollno_12th: studentDetails.rollno_12th,
          school_12th: studentDetails.school_12th,
          aggregate_12th: studentDetails.aggregate_12th,
          board_10th: studentDetails.board_10th,
          year_of_10th: studentDetails.year_of_10th,
          rollno_10th: studentDetails.rollno_10th,
          school_10th: studentDetails.school_10th,
          aggregate_10th: studentDetails.aggregate_10th,
        });
        break;
      case 4:
        validateStepFields({
          jee_rank: studentDetails.jee_rank,
          jee_percentile: studentDetails.jee_percentile,
          jee_rollno: studentDetails.jee_rollno,
          special_achievements: studentDetails.special_achievements,
        });
        break;
      case 5:
        validateStepFields({
          passport_photograph: studentDetails.passport_photograph,
          marksheet_10th: studentDetails.marksheet_10th,
          marksheet_12th: studentDetails.marksheet_12th,
          aadhar: studentDetails.aadhar,
          pancard: studentDetails.pancard,
        });
        break;
      default:
        break;
    }
    if (!isStepValid) {
      console.log('Validation errors:', newFormErrors);
      setFormErrors(newFormErrors);
    }
    else {
      axios.post(`${host}/student/personal-details/`, studentDetails, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      })
        .then((response) => {
          // Handle the response, e.g., display a success message.
          setFormErrors({
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
          setStep(step + 1);

        })
        .catch((error) => {
          // Handle errors, e.g., display an error message.
          console.error('Error submitting form:', error);
        });

    }
  };

  const finalSubmit = () => {

    alert('Student details have been submitted to the Portal');
    navigate('/dashboard')
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };
  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];

    if (file) {
      setStudentDetails({ ...studentDetails, [fieldName]: file });
    } else {
      // Handle the case where the user clears the file input
      setStudentDetails({ ...studentDetails, [fieldName]: null });
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
                <p className="mt-1 text-sm leading-6 text-gray-600">Please double check and make sure your information is correct</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Name (As registered with the college)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={studentDetails.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required
                      />
                    </div>
                    {formErrors.name && <p className="error text-red-600 text-sm font-semibold">{formErrors.name}</p>}
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                      Date of Birth
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        value={studentDetails.dob}
                        onChange={handleInputChange}
                        id="dob"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {formErrors.dob && <p className="error text-red-600 text-sm">{formErrors.dob}</p>}
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={studentDetails.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required
                      />
                    </div>
                    {formErrors.email && <p className="error text-red-600 text-sm ">{formErrors.email}</p>}
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="full_address" className="block text-sm font-medium leading-6 text-gray-900">
                      Full Adress
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="full_address"
                        placeholder="Full Address"
                        value={studentDetails.full_address}
                        onChange={handleInputChange}
                        id="full_address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required
                      />
                    </div>
                    {formErrors.full_address && <p className="error text-red-600 text-sm ">{formErrors.full_address}</p>}
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="mobile_number" className="block text-sm font-medium leading-6 text-gray-900">
                      Mobile Number
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="mobile_number"
                        placeholder="Mobile Number"
                        value={studentDetails.mobile_number}
                        onChange={handleInputChange}
                        id="mobile_number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                    {formErrors.mobile_number && <p className="error text-red-600 text-sm ">{formErrors.mobile_number}</p>}
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                      Gender
                    </label>
                    <div className="mt-2">
                      <select
                        id="gender"
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        value={studentDetails.gender}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        required
                      >
                        <option value={''}>Select Gender</option>
                        <option value={'MALE'}>Male</option>
                        <option value={'FEMALE'}>Female</option>
                        <option value={'OTHERS'}>Others</option>
                      </select>
                    </div>
                    {formErrors.gender && <p className="error text-red-600 text-sm ">{formErrors.gender}</p>}
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={studentDetails.category}
                        id='category'
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="OBC">OBC</option>
                        <option value="UR/Gen">UR/Gen</option>
                        <option value="PH">PH (Physically Handicapped/Person with Disability)</option>
                        <option value="DEFENCE">Defence</option>
                        <option value="J_AND_K_MIGRANT">J & K Migrant</option>
                      </select>
                    </div>
                    {formErrors.category && <p className="error text-red-600 text-sm ">{formErrors.category}</p>}
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                      Region
                    </label>
                    <div className="mt-2">
                      <select
                        type="text"
                        name="region"
                        placeholder="Region"
                        value={studentDetails.region}
                        id='region'
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        required
                      >
                        <option value="">Select Region</option>
                        <option value="DELHI">Delhi</option>
                        <option value="OUTSIDE_DELHI">Outside Delhi</option>
                      </select>
                    </div>

                    {formErrors.region && <p className="error text-red-600 text-sm ">{formErrors.region}</p>}
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

                  <InputField name='father_name' value={studentDetails.father_name} onChange={handleInputChange} placeholder="Father's name" />
                  {formErrors.father_name && <p className="error text-red-600 text-sm ">{formErrors.father_name}</p>}
                </div>

                <div>
                  <InputField
                    name="father_qualification"
                    value={studentDetails.father_qualification}
                    onChange={handleInputChange}
                    placeholder="Father's Qualification"
                  />
                  {formErrors.father_qualification && <p className="error text-red-600 text-sm ">{formErrors.father_qualification}</p>}
                </div>

                <div>
                  <InputField
                    name="father_mobile_number"
                    value={studentDetails.father_mobile_number}
                    onChange={handleInputChange}
                    placeholder="Father's Mobile Number"
                  />

                  {formErrors.father_mobile_number && <p className="error text-red-600 text-sm ">{formErrors.father_mobile_number}</p>}
                </div>

                <div>
                  <InputField
                    name="father_office_address"
                    value={studentDetails.father_office_address}
                    onChange={handleInputChange}
                    placeholder="Father's Office Address"
                  />
                  {formErrors.father_office_address && <p className="error text-red-600 text-sm ">{formErrors.father_office_address}</p>}

                </div>
                <div>
                  <InputField
                    name="father_occupation"
                    value={studentDetails.father_occupation}
                    onChange={handleInputChange}
                    placeholder="Father's Occupation"
                  />
                  {formErrors.father_occupation && <p className="error text-red-600 text-sm ">{formErrors.father_occupation}</p>}
                </div>

                <div>
                  <InputField
                    name="father_job_designation"
                    value={studentDetails.father_job_designation}
                    onChange={handleInputChange}
                    placeholder="Father's Job Designation"
                  />
                  {formErrors.father_job_designation && <p className="error text-red-600 text-sm ">{formErrors.father_job_designation}</p>}
                </div>
                <div>
                  <InputField
                    name="father_business_type"
                    value={studentDetails.father_business_type}
                    onChange={handleInputChange}
                    placeholder="Father's Business Type"
                  />

                  {formErrors.father_business_type && <p className="error text-red-600 text-sm ">{formErrors.father_business_type}</p>}

                </div>
              </div>
              <br />
              <h1 className='text-lg  w-fit px-2 py-1 text-blue-700 font-semibold border-b-2 pb-4'>Mother Details</h1>
              <br />
              <div className='flex gap-x-5 gap-y-10 flex-wrap '>
                <div>
                  <InputField
                    name="mother_name"
                    value={studentDetails.mother_name}
                    onChange={handleInputChange}
                    placeholder="Mother's Name"
                  />
                  {formErrors.mother_name && <p className="error text-red-600 text-sm ">{formErrors.mother_name}</p>}
                </div>
                <div>
                  <InputField
                    name="mother_occupation"
                    value={studentDetails.mother_occupation}
                    onChange={handleInputChange}
                    placeholder="Mother's Occupation"
                  />
                  {formErrors.mother_occupation && <p className="error text-red-600 text-sm ">{formErrors.mother_occupation}</p>}
                </div>
                <div>
                  <InputField
                    name="mother_job_designation"
                    value={studentDetails.mother_job_designation}
                    onChange={handleInputChange}
                    placeholder="Mother's Job Designation"
                  />
                  {formErrors.mother_job_designation && <p className="error text-red-600 text-sm ">{formErrors.mother_job_designation}</p>}
                </div>
                <div>
                  <InputField
                    name="mother_office_address"
                    value={studentDetails.mother_office_address}
                    onChange={handleInputChange}
                    placeholder="Mother's Office Address"
                  />

                  {formErrors.mother_office_address && <p className="error text-red-600 text-sm ">{formErrors.mother_office_address}</p>}
                </div>
                <div>
                  <InputField
                    name="mother_mobile_number"
                    value={studentDetails.mother_mobile_number}
                    onChange={handleInputChange}
                    placeholder="Mother's Mobile Number"
                  />
                  {formErrors.mother_mobile_number && <p className="error text-red-600 text-sm ">{formErrors.mother_mobile_number}</p>}
                </div>
                <div>
                  <InputField
                    name="mother_business_type"
                    value={studentDetails.mother_business_type}
                    onChange={handleInputChange}
                    placeholder="Mother's Business Type"
                  />
                  {formErrors.mother_business_type && <p className="error text-red-600 text-sm ">{formErrors.mother_business_type}</p>}
                </div>

              </div>


              <div className='mt-10'>
                <InputField
                  name="guardian_name"
                  value={studentDetails.guardian_name}
                  onChange={handleInputChange}
                  placeholder="Guardian's Name"
                />
                {formErrors.guardian_name && <p className="error text-red-600 text-sm ">{formErrors.guardian_name}</p>}
              </div>
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
          <div className="p-4 rounded-lg">
            <h2 className="text-2xl font-semibold border-b-2 pb-4 mb-4 text-blue-700 "> Academic Results</h2>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              {/* 10th Class Details */}
              <h1 className='text-lg  w-fit px-2 py-1 text-blue-700 font-semibold border-b-2 pb-4'>10th class Details</h1>
              <br />
              <div className='flex gap-x-5 gap-y-10 flex-wrap '>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="board_10th" className="block text-sm font-medium leading-6 text-gray-900">
                    10th Board
                  </label>
                  <div className="mt-2">
                    <input
                      type='text'
                      name="board_10th"
                      value={studentDetails.board_10th}
                      onChange={handleInputChange}
                      placeholder="10th Board"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formErrors.board_10th && <p className="error text-red-600 text-sm ">{formErrors.board_10th}</p>}
                  </div>
                </div>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="year_of_10th" className="block text-sm font-medium leading-6 text-gray-900">
                    Year of Passing (10th)
                  </label>
                  <div className="mt-2">
                    <input
                      name="year_of_10th"
                      value={studentDetails.year_of_10th}
                      onChange={handleInputChange}
                      placeholder="Year of Passing (10th)"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formErrors.year_of_10th && <p className="error text-red-600 text-sm ">{formErrors.year_of_10th}</p>}
                  </div>
                </div>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="rollno_10th" className="block text-sm font-medium leading-6 text-gray-900">
                    10th Roll Number
                  </label>
                  <div className="mt-2">

                    <input
                      name="rollno_10th"
                      value={studentDetails.rollno_10th}
                      onChange={handleInputChange}
                      placeholder="10th Roll Number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formErrors.rollno_10th && <p className="error text-red-600 text-sm ">{formErrors.rollno_10th}</p>}
                </div>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="school_10th" className="block text-sm font-medium leading-6 text-gray-900">
                    School Name (10th)
                  </label>
                  <div className="mt-2">

                    <input
                      name="school_10th"
                      value={studentDetails.school_10th}
                      onChange={handleInputChange}
                      placeholder="School Name (10th)"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formErrors.school_10th && <p className="error text-red-600 text-sm ">{formErrors.school_10th}</p>}
                  </div>
                </div>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="aggregate_10th" className="block text-sm font-medium leading-6 text-gray-900">
                    Aggregate (10th)
                  </label>
                  <div className="mt-2">

                    <input
                      name="aggregate_10th"
                      value={studentDetails.aggregate_10th}
                      onChange={handleInputChange}
                      placeholder="Aggregate (10th)"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formErrors.aggregate_10th && <p className="error text-red-600 text-sm ">{formErrors.aggregate_10th}</p>}
                  </div>
                </div>
              </div>
              <br />
              <h1 className='text-lg  w-fit px-2 py-1 text-blue-700 font-semibold border-b-2 pb-4'>12th class Details</h1>
              <br />
              <div className='flex gap-x-5 gap-y-10 flex-wrap '>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="board_12th" className="block text-sm font-medium leading-6 text-gray-900">
                    12th Board
                  </label>
                  <div className="mt-2">

                    <input
                      name="board_12th"
                      value={studentDetails.board_12th}
                      onChange={handleInputChange}
                      placeholder="12th Board"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    />
                    {formErrors.board_12th && <p className="error text-red-600 text-sm ">{formErrors.board_12th}</p>}
                  </div>
                </div>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="year_of_12th" className="block text-sm font-medium leading-6 text-gray-900">
                    Year of Passing (12th)
                  </label>
                  <div className="mt-2">

                    <input
                      name="year_of_12th"
                      value={studentDetails.year_of_12th}
                      onChange={handleInputChange}
                      placeholder="Year of Passing (12th)"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formErrors.year_of_12th && <p className="error text-red-600 text-sm ">{formErrors.year_of_12th}</p>}
                  </div>
                </div>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="rollno_12th" className="block text-sm font-medium leading-6 text-gray-900">
                    12th Roll Number
                  </label>
                  <div className="mt-2">

                    <input
                      name="rollno_12th"
                      value={studentDetails.rollno_12th}
                      onChange={handleInputChange}
                      placeholder="12th Roll Number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formErrors.rollno_12th && <p className="error text-red-600 text-sm ">{formErrors.rollno_12th}</p>}
                  </div>
                </div>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="school_12th" className="block text-sm font-medium leading-6 text-gray-900">
                    School Name (12th)
                  </label>
                  <div className="mt-2">

                    <input
                      name="school_12th"
                      value={studentDetails.school_12th}
                      onChange={handleInputChange}
                      placeholder="School Name (12th)"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    />
                    {formErrors.school_12th && <p className="error text-red-600 text-sm ">{formErrors.school_12th}</p>}
                  </div>
                </div>
                <div className="sm:col-span-3 mt-2">
                  <label htmlFor="aggregate_12th" className="block text-sm font-medium leading-6 text-gray-900">
                    Aggregate (12th)
                  </label>
                  <div className="mt-2">

                    <input
                      name="aggregate_12th"
                      value={studentDetails.aggregate_12th}
                      onChange={handleInputChange}
                      placeholder="Aggregate (12th)"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formErrors.aggregate_12th && <p className="error text-red-600 text-sm ">{formErrors.aggregate_12th}</p>}
                  </div>
                </div>
              </div>

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

      case 4:
        return (
          <div className=" p-4 rounded-lg">
            <h2 className="text-2xl font-semibold border-b-2 pb-4 mb-4 text-blue-700 ">JEE Details and Achievements</h2>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <div>
                <InputField
                  name="jee_rank"
                  value={studentDetails.jee_rank}
                  onChange={handleInputChange}
                  placeholder="JEE Rank"
                />
                {formErrors.jee_rank && <p className="error text-red-600 text-sm ">{formErrors.jee_rank}</p>}

              </div>
              <div>
                <InputField
                  name="jee_percentile"
                  value={studentDetails.jee_percentile}
                  onChange={handleInputChange}
                  placeholder="JEE Percentile(upto 4 decimals)"
                />
                {formErrors.jee_percentile && <p className="error text-red-600 text-sm ">{formErrors.jee_percentile}</p>}
              </div>
              <div>
                <InputField
                  name="jee_rollno"
                  value={studentDetails.jee_rollno}
                  onChange={handleInputChange}
                  placeholder="JEE Roll Number"

                />

                {formErrors.jee_rollno && <p className="error text-red-600 text-sm ">{formErrors.jee_rollno}</p>}
              </div>
              <div>
                <InputField
                  name="special_achievements"
                  value={studentDetails.special_achievements}
                  onChange={handleInputChange}
                  placeholder="Special Achievements"
                />

                {formErrors.special_achievements && <p className="error text-red-600 text-sm ">{formErrors.special_achievements}</p>}
              </div>

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
      case 5:
        return (
          <div className=" p-4 rounded-lg">
            <h2 className="text-2xl font-semibold border-b-2 pb-4 mb-4 text-blue-700 ">Upload Images and Files</h2>
            <form onSubmit={handleFormSubmit} encType='multipart/form-data' >
              <div className='flex flex-wrap gap-10'>

                <div>
                  <label htmlFor="passport_photograph">Passport Photograph:</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="passport_photograph"
                    name="passport_photograph"
                    required
                    onChange={(e) => handleFileInputChange(e, 'passport_photograph')}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="marksheet_10th">10th Marksheet:</label>
                  <input
                    type="file"
                    id="marksheet_10th"
                    accept='application/pdf'
                    name="marksheet_10th"
                    required
                    onChange={(e) => handleFileInputChange(e, 'marksheet_10th')}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="marksheet_12th">12th Marksheet:</label>
                  <input
                    type="file"
                    accept='application/pdf'
                    id="marksheet_12th"
                    required
                    name="marksheet_12th"
                    onChange={(e) => handleFileInputChange(e, 'marksheet_12th')}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="aadhar">Aadhar Card:</label>
                  <input
                    type="file"
                    accept='application/pdf'
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
                    required
                    accept='application/pdf'
                    id="pancard"
                    name="pancard"
                    onChange={(e) => handleFileInputChange(e, 'pancard')}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                </div>

              </div>
              <br />
              <h2 className="text-base font-semibold leading-7 text-gray-900">Note that:</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Please check that all files are uplaoded correctly before proceeding forward.</p>
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

      case 6:
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
                    value={studentDetails.name}
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
                    value={studentDetails.dob}
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
                    value={studentDetails.full_address}
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
                    value={studentDetails.email}
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
                    value={studentDetails.mobile_number}
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
                    value={studentDetails.gender}
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
                    value={studentDetails.category}
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
                    value={studentDetails.region}
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
                    value={studentDetails.father_name}
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
                    value={studentDetails.mother_name}
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
                    value={studentDetails.father_qualification}
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
                    value={studentDetails.mother_qualification}
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
                    value={studentDetails.board_12th}
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
                    value={studentDetails.year_of_12th}
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
                    value={studentDetails.rollno_12th}
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
                    value={studentDetails.school_12th}
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
                    value={studentDetails.aggregate_12th}
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
                    value={studentDetails.jee_rank}
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
                    value={studentDetails.jee_percentile}
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
                    value={studentDetails.jee_rollno}
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
                    value={studentDetails.special_achievements}
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
                  {studentDetails.passport_photograph ? (
                    <p>Uploaded File: {studentDetails.passport_photograph.name}</p>
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
                  {studentDetails.marksheet_10th ? (
                    <p>Uploaded File: {studentDetails.marksheet_10th.name}</p>
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
                  {studentDetails.marksheet_12th ? (
                    <p>Uploaded File: {studentDetails.marksheet_12th.name}</p>
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
                  {studentDetails.aadhar ? (
                    <p>Uploaded File: {studentDetails.aadhar.name}</p>
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
                  {studentDetails.pancard ? (
                    <p>Uploaded File: {studentDetails.pancard.name}</p>
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
        <h1 className="text-3xl font-bold text-indigo-900 mb-4">Student Details Form</h1>
        {renderStep()}
      </div>
    </div>

  );
};

export default DetailsForm;
