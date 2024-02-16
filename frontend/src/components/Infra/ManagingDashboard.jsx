
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ManagingSidePanel from './ManagingSidePanel';

const ManagingDashboard = ({ user }) => {
    const accessToken = localStorage.getItem('accessToken');
    const [formFilled, setFormFilled] = useState(false);
    const [student, setStudent] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8000/student/personal-details/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setStudent(response.data);
                if (response.status === 204) {
                    // If status is 204, set formFilled to false
                    setFormFilled(false);

                } else if (response.data.pancard !== null) {
                    // If response.data.pancard is not null, set formFilled to true
                    setFormFilled(true);
                } else {
                    // In all other cases, set formFilled to false
                    setFormFilled(false);
                }
                // Now you can use the formFilled value as needed
                // For example, you can log it or use it in your application logic
                console.log('formFilled:', formFilled);
            })

            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [accessToken, formFilled]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('excel_file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8000/infra/handle-excel/', formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                alert('Data uploaded successfully');
                // Perform any other actions upon successful upload
            } else {
                console.error('Error response:', response);
                alert('Oops, some error occurred');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Oops, some error occurred');
        }
    };

    return (
        <div className='bg-slate-300'>

            <div className="p-5  w-[90%] m-auto">
                <div className="mb-8 w-fit">
                    <Link to={'/dashboard'} ><h1 className="text-xl hover:bg-gray-100 text-blue-900  w-fit p-2 rounded font-semibold bg-gray-200">Your Dashboard</h1></Link>
                </div>
                <div className='flex gap-8'>
                    <div>
                        <ManagingSidePanel />
                    </div>
                    <div className='bg-gray-100 p-8 w-full'>
                        <h1 className='text-2xl font-semibold mb-4'>Bulk Data Upload</h1>
                        <p className='mb-4'>
                            To efficiently upload bulk data, please download the provided Excel template. Ensure your data follows the requested format before proceeding with the upload.
                        </p>
                        <a href='http://localhost:8000/serve-static/infra-template.xlsx' className='text-blue-500 underline mb-6 inline-block'>
                            Download Excel Template
                        </a>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='file' className='block text-sm font-medium text-gray-700 mb-2'>
                                Upload Your File:
                            </label>
                            <input
                                type='file'
                                id='file'
                                className='border border-gray-300 p-2 w-full mb-4'
                                onChange={handleFileChange}
                            />
                            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                                Upload File
                            </button>
                        </form>
                        <h2 className='text-lg font-semibold mt-8 mb-4'>To add Assets Manually</h2>
                        <div className='w-[200px]'>
                            <Link to={'/infra-form'}>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Click here
                                </button>
                            </Link>
                        </div>
                        <h2 className='text-lg font-semibold mt-8 mb-4'>View the existing Uploaded Data</h2>
                        <div className='w-[200px]'>
                            <Link to={'/infra-data'}>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Click here
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ManagingDashboard

