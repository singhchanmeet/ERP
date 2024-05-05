import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllPlacements() {
  const [placements, setPlacements] = useState([]);
  const [loggedInUserRole, setLoggedInUserRole] = useState('');
  const [formData, setFormData] = useState({ company_name: '', pkg_offered: '', role: '', description: '' });
  const [editingPlacement, setEditingPlacement] = useState(null);
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${accessToken}` };

        const userRoleResponse = await axios.get(`${host}/user-details/`, { headers });
        setLoggedInUserRole(userRoleResponse.data.role);
        console.log(userRoleResponse.data.role)

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

  const handleAddPlacement = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      await axios.post(`${host}/placements/all-placements/`, formData, { headers });
      setFormData({ company_name: '', pkg_offered: '', role: '', description: '' });
    } catch (error) {
      console.error('Error adding placement:', error);
    }
  };

  const handleEditPlacement = async () => {
    if (!editingPlacement) return;
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      await axios.patch(`${host}/placements/all-placements/${editingPlacement.id}/`, formData, { headers });
      setEditingPlacement(null);
      setFormData({ company_name: '', pkg_offered: '', role: '', description: '' });
    } catch (error) {
      console.error('Error editing placement:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleEditClick = (placement) => {
    setEditingPlacement(placement);
    setFormData(placement);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Placements</h1>
      {loggedInUserRole === 'PLACEMENTOFFICER' && (
        <div className="mb-4">
          <form onSubmit={handleAddPlacement}>
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
            <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-md">Add</button>
          </form>
        </div>
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
      {/* Edit Placement Form */}
      {editingPlacement && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Edit Placement</h2>
          <form onSubmit={handleEditPlacement}>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleInputChange}
              className="mr-2"
            />
            <input
              type="text"
              name="pkg_offered"
              value={formData.pkg_offered}
              onChange={handleInputChange}
              className="mr-2"
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mr-2"
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mr-2"
            />
            <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md">Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AllPlacements;
