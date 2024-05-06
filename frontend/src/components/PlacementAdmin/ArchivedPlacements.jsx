import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArchivedPlacements() {
  const [placements, setPlacements] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loggedInUserRole, setLoggedInUserRole] = useState('');
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };

      const userRoleResponse = await axios.get(`${host}/user-details/`, { headers });
      setLoggedInUserRole(userRoleResponse.data.role);
      console.log(userRoleResponse.data.role);
      const placementsResponse = await axios.get(`${host}/placements/all-placements/`, { headers });
      setPlacements(placementsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleArchiveToggle = async (id, archiveValue) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };

      if (loggedInUserRole !== 'PLACEMENTOFFICER') {
        console.error('Unauthorized');
        return;
      }

      const response = await axios.patch(`${host}/placements/all-placements/${id}/`, { archive: archiveValue }, { headers });
      const updatedPlacements = placements.map((placement) =>
        placement.id === id ? { ...placement, archive: archiveValue } : placement
      );
      setPlacements(updatedPlacements);
    } catch (error) {
      console.error('Error toggling archive status:', error);
    }
  };

  const filteredPlacements = placements.filter((placement) =>
    placement.company_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mx-auto mb-10">
      <h1 className="text-3xl font-bold my-10">Archived Placements</h1>
      <input
        type="text"
        placeholder="Search by Company Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        value={searchText}
        onChange={handleSearch}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Company Name</th>
            <th className="border border-gray-300 px-4 py-2">Package Offered</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Archive</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlacements.map((placement, index) => (
            <tr key={placement.id} className={index%2==0 ? 'bg-gray-300': 'bg-white'}>
              <td className="border border-gray-300 px-4 py-2">{placement.id}</td>
              <td className="border border-gray-300 px-4 py-2">{placement.company_name}</td>
              <td className="border border-gray-300 px-4 py-2">{placement.pkg_offered}</td>
              <td className="border border-gray-300 px-4 py-2">{placement.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="checkbox"
                  checked={placement.archive}
                  onChange={(e) => handleArchiveToggle(placement.id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArchivedPlacements;
