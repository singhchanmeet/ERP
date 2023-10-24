import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ErrorPage from '../standard/ErrorPage';
import bgForm from "../../assets/bg_forms.jpg";
import { useNavigate } from 'react-router-dom';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
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
    axios.get('http://localhost:8000/student/personal-details/', {
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
    if (studentDetails.name.length < 2) {
      setFormErrors({
        username: 'Name must be at least 2 characters long.',
        // Set other form errors as needed...
      });
    } else {
      if (studentDetails.name.length < 2) {
        setFormErrors({
          username: 'Name must be at least 2 characters long.',
        });
      } else {

        setFormErrors({
          username: '',
        });
        // Handle the form submission using Axios POST
        axios.post('http://localhost:8000/student/personal-details/', studentDetails, {
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
    if (studentDetails.name.length < 2) {
      setFormErrors({
        username: 'Name must be at least 2 characters long.',
      });
    } else {
      setStep(step + 1);
      setFormErrors({
        username: '',
      });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className=" p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 1: Personal Details</h2>
            <form onSubmit={nextStep} encType='multipart/form-data'>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={studentDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300 outline-none"
                />
              </div>
              {formErrors.username && <p className="error text-red-600">{formErrors.username}</p>}
              <div>
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={studentDetails.dob}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="full_address"
                  placeholder="Full Address"
                  value={studentDetails.full_address}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={studentDetails.email}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mobile_number"
                  placeholder="Mobile Number"
                  value={studentDetails.mobile_number}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={studentDetails.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={studentDetails.category}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="region"
                  placeholder="Region"
                  value={studentDetails.region}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={handleFormSubmit} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
              <form>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                          Username
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                            <input
                              type="text"
                              name="username"
                              id="username"
                              autoComplete="username"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="janesmith"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                          About
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                          Photo
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                          <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                          <button
                            type="button"
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                          Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Please double check and make sure your information is correct</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                          Name (As registered with the college)
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            value={studentDetails.name}
                            onChange={handleInputChange}
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {formErrors.username && <p className="error text-red-600 text-sm font-semibold">{formErrors.username}</p>}
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                          Date
                        </label>
                        <div className="mt-2">
                          <input
                            type="date"
                            name="dob"
                            placeholder="Date of Birth"
                            value={studentDetails.dob}
                            onChange={handleInputChange}
                            id="date"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
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
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                          Full Adress
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="full_address"
                            placeholder="Full Address"
                            value={studentDetails.full_address}
                            onChange={handleInputChange}
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                          Mobile Number
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="mobile_number"
                            placeholder="Mobile Number"
                            value={studentDetails.mobile_number}
                            onChange={handleInputChange}
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                          Gender
                        </label>
                        <div className="mt-2">
                          <select
                            id="country"
                            type="text"
                            name="gender"
                            placeholder="Gender"
                            value={studentDetails.gender}
                            onChange={handleInputChange}
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>MALE</option>
                            <option>FEMALE</option>
                            <option>OTHERS</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                          Country
                        </label>
                        <div className="mt-2">
                          <select
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={studentDetails.category}
                            onChange={handleInputChange}
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>SC</option>
                            <option>ST</option>
                            <option>OBC</option>
                            <option>UR/Gen</option>
                            <option>PH</option>
                            <option>DEFENCE</option>
                            <option>J & K Migrant</option>
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                          Region
                        </label>
                        <div className="mt-2">
                          <select
                            type="text"
                            name="region"
                            placeholder="Region"
                            value={studentDetails.region}
                            onChange={handleInputChange}
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>Delhi</option>
                            <option>Outside Delhi</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                        <div className="mt-6 space-y-6">
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label htmlFor="comments" className="font-medium text-gray-900">
                                Comments
                              </label>
                              <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                            </div>
                          </div>
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="candidates"
                                name="candidates"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label htmlFor="candidates" className="font-medium text-gray-900">
                                Candidates
                              </label>
                              <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                            </div>
                          </div>
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="offers"
                                name="offers"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label htmlFor="offers" className="font-medium text-gray-900">
                                Offers
                              </label>
                              <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="push-everything"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                              Everything
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="push-email"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                              Same as email
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="push-nothing"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                              No push notifications
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>

            </form>
          </div>
        );

      case 2:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 2: Parent Details</h2>
            <form onSubmit={nextStep} encType="multipart/form-data">
              <div>
                <input
                  type="text"
                  name="father_name"
                  placeholder="Father's Name"
                  value={studentDetails.father_name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_name"
                  placeholder="Mother's Name"
                  value={studentDetails.mother_name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_qualification"
                  placeholder="Father's Qualification"
                  value={studentDetails.father_qualification}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_qualification"
                  placeholder="Mother's Qualification"
                  value={studentDetails.mother_qualification}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_occupation"
                  placeholder="Father's Occupation"
                  value={studentDetails.father_occupation}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_occupation"
                  placeholder="Mother's Occupation"
                  value={studentDetails.mother_occupation}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_job_designation"
                  placeholder="Father's Job Designation"
                  value={studentDetails.father_job_designation}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_job_designation"
                  placeholder="Mother's Job Designation"
                  value={studentDetails.mother_job_designation}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_business_type"
                  placeholder="Father's Business Type"
                  value={studentDetails.father_business_type}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_business_type"
                  placeholder="Mother's Business Type"
                  value={studentDetails.mother_business_type}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_mobile_number"
                  placeholder="Father's Mobile Number"
                  value={studentDetails.father_mobile_number}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_mobile_number"
                  placeholder="Mother's Mobile Number"
                  value={studentDetails.mother_mobile_number}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="father_office_address"
                  placeholder="Father's Office Address"
                  value={studentDetails.father_office_address}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="mother_office_address"
                  placeholder="Mother's Office Address"
                  value={studentDetails.mother_office_address}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="guardian_name"
                  placeholder="Guardian's Name"
                  value={studentDetails.guardian_name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Previous
                </button>
                <button type="submit" onClick={handleFormSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 3: 10th and 12th Results</h2>
            <form onSubmit={nextStep} encType="multipart/form-data">
              {/* 12th Class Details */}
              <div>
                <input
                  type="text"
                  name="board_12th"
                  placeholder="12th Board"
                  value={studentDetails.board_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="year_of_12th"
                  placeholder="Year of Passing (12th)"
                  value={studentDetails.year_of_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="rollno_12th"
                  placeholder="12th Roll Number"
                  value={studentDetails.rollno_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="school_12th"
                  placeholder="School Name (12th)"
                  value={studentDetails.school_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="aggregate_12th"
                  placeholder="Aggregate (12th)"
                  value={studentDetails.aggregate_12th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>

              {/* 10th Class Details */}
              <div>
                <input
                  type="text"
                  name="board_10th"
                  placeholder="10th Board"
                  value={studentDetails.board_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="year_of_10th"
                  placeholder="Year of Passing (10th)"
                  value={studentDetails.year_of_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="rollno_10th"
                  placeholder="10th Roll Number"
                  value={studentDetails.rollno_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="school_10th"
                  placeholder="School Name (10th)"
                  value={studentDetails.school_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="aggregate_10th"
                  placeholder="Aggregate (10th)"
                  value={studentDetails.aggregate_10th}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>

              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover-bg-gray-600">
                  Previous
                </button>
                <button type="submit" onClick={handleFormSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </form>
          </div>
        );

      case 4:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 4: JEE Details and Achievements</h2>
            <form onSubmit={nextStep} encType="multipart/form-data">
              <div>
                <input
                  type="number"
                  name="jee_rank"
                  placeholder="JEE Rank"
                  value={studentDetails.jee_rank}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="jee_percentile"
                  placeholder="JEE Percentile"
                  value={studentDetails.jee_percentile}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="jee_rollno"
                  placeholder="JEE Roll Number"
                  value={studentDetails.jee_rollno}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="special_achievements"
                  placeholder="Special Achievements"
                  value={studentDetails.special_achievements}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover-bg-gray-600">
                  Previous
                </button>
                <button type="submit" onClick={handleFormSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 5:
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Step 5: Upload Images and Files</h2>
            <form onSubmit={nextStep} encType='multipart/form-data'>
              <div>
                <label htmlFor="passport_photograph">Passport Photograph:</label>
                <input
                  type="file"
                  accept="image/*"
                  id="passport_photograph"
                  name="passport_photograph"
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
                  name="aadhar"
                  onChange={(e) => handleFileInputChange(e, 'aadhar')}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <label htmlFor="pancard">PAN Card:</label>
                <input
                  type="file"
                  accept='application/pdf'
                  id="pancard"
                  name="pancard"
                  onChange={(e) => handleFileInputChange(e, 'pancard')}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover-bg-gray-600">
                  Previous
                </button>
                <button type="submit" onClick={handleFormSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Next
                </button>
              </div>
            </form>
          </div>
        );

      case 6:
        return (
          <>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Step 6: Data Submission</h2>
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
