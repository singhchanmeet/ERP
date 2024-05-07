import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnnouncementsPlacement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loggedInUserRole, setLoggedInUserRole] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '', docs: '' });
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${accessToken}` };

        const userRoleResponse = await axios.get(`${host}/user-details/`, { headers });
        setLoggedInUserRole(userRoleResponse.data.role);

        const announcementsResponse = await axios.get(`${host}/placements/announcement/`, { headers });
        setAnnouncements(announcementsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [host]);

  const handleDeleteAnnouncement = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      await axios.delete(`${host}/placements/announcement/${id}/`, { headers });
      setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleAddAnnouncement = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      await axios.post(`${host}/placements/announcement/`, formData, { headers });
      setModalIsOpen(false);
      setFormData({ title: '', desc: '' });
      const updatedAnnouncements = await axios.get(`${host}/placements/announcement/`, { headers });
      setAnnouncements(updatedAnnouncements.data);
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddAnnouncement();
  };

  const getFileNameFromPath = (path) => {
    if (path) {
      const parts = path.split('/');
      return parts[parts.length - 1];
    }
    return '';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold mb-4">Announcements</h2>
      {loggedInUserRole === 'PLACEMENTOFFICER' && (
        <button onClick={() => setModalIsOpen(true)} className="bg-blue-500 text-white px-2 py-1 rounded-md mb-4">
          Add New Announcement
        </button>
      )}
      <div className="my-4">
        <table className="table-auto w-full border-collapse border border-gray-800">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-800 px-4 py-2">Title</th>
              <th className="border border-gray-800 px-4 py-2">Description</th>
              <th className="border border-gray-800 px-4 py-2">Date</th>
              <th className="border border-gray-800 px-4 py-2">Documents</th>
              <th className="border border-gray-800 px-4 py-2">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td className="border border-gray-800 px-4 py-2">{announcement.title}</td>
                <td className="border border-gray-800 px-4 py-2">{announcement.desc}</td>
                <td className="border border-gray-800 px-4 py-2">{new Date(announcement.date).toLocaleString()}</td>
                <td className="border border-gray-800 px-4 py-2">
                  <a href={announcement.docs} target="_blank" rel="noopener noreferrer">
                    {
                    (announcement.docs)
                    ? <p className='text-blue-600 hover:underline'>{getFileNameFromPath(announcement.docs)}</p>
                    :
                     "no doc"
                     }
                  </a>
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white p-8 rounded-md z-50 relative">
            <h2 className="text-2xl font-bold mb-4">Add New Announcement</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                placeholder="Description"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              ></textarea>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                  Add Announcement
                </button>
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnnouncementsPlacement;
