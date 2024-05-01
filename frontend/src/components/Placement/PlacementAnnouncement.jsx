import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlacementAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${accessToken}` };

        const announcementsResponse = await axios.get(`${host}/placements/announcement/`, { headers });
        setAnnouncements(announcementsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [host]);

  const getFileNameFromPath = path => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold mb-4">Announcements</h2>
      <div className="my-4">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-800 px-4 py-2">Title</th>
              <th className="border border-gray-800 px-4 py-2">Description</th>
              <th className="border border-gray-800 px-4 py-2">Date</th>
              <th className="border border-gray-800 px-4 py-2">Documents</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td className="border border-gray-800 px-4 py-2">{announcement.title}</td>
                <td className="border border-gray-800 px-4 py-2">{announcement.desc}</td>
                <td className="border border-gray-800 px-4 py-2">{new Date(announcement.date).toLocaleString()}</td>
                <td className="border border-gray-800 px-4 py-2">
                  {announcement.docs ? (
                    <a
                      href={announcement.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      {getFileNameFromPath(announcement.docs)}
                    </a>
                  ) : (
                    <span>Not Available</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlacementAnnouncement;
