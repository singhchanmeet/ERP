import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function AddEditModal({ isOpen, onRequestClose, onSave, placement }) {
  const [formData, setFormData] = useState({ ...placement });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>{placement ? 'Edit Placement' : 'Add Placement'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleInputChange}
          placeholder="Company Name"
          className="mr-2"
        />
        <input
          type="text"
          name="pkg_offered"
          value={formData.pkg_offered}
          onChange={handleInputChange}
          placeholder="Package Offered"
          className="mr-2"
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          placeholder="Role"
          className="mr-2"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="mr-2"
        />
        <button type="submit">{placement ? 'Update' : 'Add'}</button>
      </form>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

function AllPlacements() {
  const [placements, setPlacements] = useState([]);
  const [loggedInUserRole, setLoggedInUserRole] = useState('');
  const [editingPlacement, setEditingPlacement] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const handleSavePlacement = async (formData) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };

      if (editingPlacement) {
        await axios.patch(`${host}/placements/all-placements/${editingPlacement.id}/`, formData, { headers });
        setEditingPlacement(null);
      } else {
        await axios.post(`${host}/placements/all-placements/`, formData, { headers });
      }

      setModalIsOpen(false);
      setPlacements([...placements, formData]); // Add the new placement to the list
    } catch (error) {
      console.error('Error saving placement:', error);
    }
  };

  const handleEditClick = (placement) => {
    setEditingPlacement(placement);
    setModalIsOpen(true);
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
      <AddEditModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSave={handleSavePlacement}
        placement={editingPlacement}
      />
    </div>
  );
}

export default AllPlacements;
