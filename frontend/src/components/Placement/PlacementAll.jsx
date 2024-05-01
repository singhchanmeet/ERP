import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlacementAll() {
  const [placements, setPlacements] = useState([]);
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/placements/all-placements/`);
        setPlacements(response.data);
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
      <h2 className="text-4xl font-semibold mb-4">All Placements</h2>
      <div className="grid grid-cols-2 gap-4">
        {placements.map(placement => (
          <div key={placement.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">Company: {placement.company_name}</h3>
            <p>Package Offered: ${placement.pkg_offered}</p>
            <p>Role: {placement.role}</p>
            <p>Date: {new Date(placement.date).toLocaleDateString()}</p>
            <p>Description: {placement.description}</p>
            <p>Document: {placement.docs ? (
              <a
                href={placement.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                {getFileNameFromPath(placement.docs)}
              </a>
            ) : (
              <>
                Not Available
              </>
            )}</p>
            {placement.archive && <p className="text-red-500">Archived</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacementAll;
