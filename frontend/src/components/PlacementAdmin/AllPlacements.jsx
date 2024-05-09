import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';

function AllPlacements() {
  const [placements, setPlacements] = useState([]);
  const [loggedInUserRole, setLoggedInUserRole] = useState('');
  const [editingPlacement, setEditingPlacement] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    pkg_offered: '',
    role: '',
    description: '',
    docs: null,
    date: new Date(),
    archive: false,
  });
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${accessToken}` };

        const userRoleResponse = await axios.get(`${host}/user-details/`, { headers });
        setLoggedInUserRole(userRoleResponse.data.role);

        const placementsResponse = await axios.get(`${host}/placements/all-placements/`, { headers });
        setPlacements(placementsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [host]);

  const handleDeletePlacement = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      await axios.delete(`${host}/placements/all-placements/${id}/`, { headers });
      setPlacements(placements.filter((placement) => placement.id !== id));
    } catch (error) {
      console.error('Error deleting placement:', error);
    }
  };

  const handleSavePlacement = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };

      const formDataToSend = new FormData();
      formDataToSend.append('company_name', formData.company_name);
      formDataToSend.append('pkg_offered', formData.pkg_offered);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('docs', formData.docs);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('archive', formData.archive);

      if (editingPlacement) {
        await axios.patch(`${host}/placements/all-placements/${editingPlacement.id}/`, formDataToSend, { headers });
        setEditingPlacement(null);
      } else {
        await axios.post(`${host}/placements/all-placements/`, formDataToSend, { headers });
      }

      setModalIsOpen(false);
      setFormData({
        company_name: '',
        pkg_offered: '',
        role: '',
        description: '',
        docs: null,
        date: new Date(),
        archive: false,
      });
      const updatedPlacements = await axios.get(`${host}/placements/all-placements/`, { headers });
      setPlacements(updatedPlacements.data);
    } catch (error) {
      console.error('Error saving placement:', error);
    }
  };

  const handleEditClick = (placement) => {
    setEditingPlacement(placement);
    setFormData(placement);
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({ ...prevFormData, date }));
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData((prevFormData) => ({ ...prevFormData, docs: file }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSavePlacement();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-10">All Placements</h1>
      {loggedInUserRole === 'PLACEMENTOFFICER' && (
        <button onClick={() => setModalIsOpen(true)} className="bg-blue-500 text-white px-2 py-1 rounded-md mb-4">
          Add Placement Details
        </button>
      )}
      <div className="grid grid-cols-3 gap-4">
        {placements.map((placement) => (
          <div key={placement.id} className="border p-4">
            <p className="text-lg font-semibold">{placement.company_name}</p>
            <p>Pkg Offered: {placement.pkg_offered}</p>
            <p>Role: {placement.role}</p>
            <p>Description: {placement.description}</p>
            <p>Date: {new Date(placement.date).toLocaleDateString()}</p>
            <p>Archived: {placement.archive ? 'Yes' : 'No'}</p>
            {loggedInUserRole === 'PLACEMENTOFFICER' && (
              <div className="mt-2">
                <button
                  onClick={() => handleEditClick(placement)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlacement(placement.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Custom Modal */}
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white p-8 rounded-md z-50 relative">
            <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => setModalIsOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <h2 className="text-2xl font-bold mb-4">{editingPlacement ? 'Edit Placement' : 'Add Placement'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="text"
                name="pkg_offered"
                value={formData.pkg_offered}
                onChange={handleInputChange}
                placeholder="Package Offered"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Role"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Date"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <div {...getRootProps()} className="dropzone cursor-pointer border border-gray-300 rounded-md mb-4 py-2">
                <input {...getInputProps()} />
                {formData.docs ? (
                  <p>{formData.docs.name}</p>
                ) : (
                  <p className='text-blue-500 underline'>Select to upload files</p>
                )}
              </div>
              <input
                type="checkbox"
                name="archive"
                checked={formData.archive}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="archive">Archive</label>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                  {editingPlacement ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPlacements;
