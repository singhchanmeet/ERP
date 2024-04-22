import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fees = () => {
  const [feesData, setFeesData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/fee/feerouterfees/`);
        const sortedFeesData = response.data.sort((a, b) => a.batch.localeCompare(b.batch));
        setFeesData(sortedFeesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBatch(null);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Fees Details</h1>
      <div className="flex flex-wrap justify-center gap-20 m-10">
        {feesData.map((fee) => (
          <div key={fee.id} className="mb-4">
            <button
              className="bg-gray-200 text-2xl px-10 py-4 rounded-lg text-center cursor-pointer hover:scale-125"
              onClick={() => handleBatchClick(fee.batch)}
            >
              <div>{fee.batch}</div>
            </button>
          </div>
        ))}
        {showModal && selectedBatch && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 w-1/3 rounded-lg">
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold">Fees for Batch {selectedBatch}</h2>
                <button className="text-red-500" onClick={closeModal}>
                &#10060;
                </button>
              </div>
              {feesData
                .filter((fee) => fee.batch === selectedBatch)
                .map((fee) => (
                  <div key={fee.id} className="mb-4 text-xl">
                    <p>
                      Tuition Fee: <span className=' font-semibold'>{fee.display_tution_fee ? fee.tution_fee : ' ---'}</span>
                    </p>
                    <p>
                      Activity Fee: <span className=' font-semibold'> {fee.display_activity_fee ? fee.activity_fee : ' ---'}</span>
                    </p>
                    <p>
                      University Fee: <span className=' font-semibold'> {fee.display_university_fee ? fee.university_fee : ' ---'}</span>
                    </p>
                    <p>
                      Security Fee: <span className=' font-semibold'> {fee.display_security_fee ? fee.security_fee : ' ---'}</span>
                    </p>
                    <p>
                      College Magazine Fee: <span className=' font-semibold'> {fee.display_college_magazine ? fee.college_magazine : ' ---'}</span>
                    </p>
                    <p>
                      Rechecking Fee: <span className=' font-semibold'> {fee.display_rechecking_fee ? fee.rechecking_fee : ' ---'}</span>
                    </p>
                    <p>Fine: <span className=' font-semibold'> {fee.display_fine ? fee.fine : ' ---'}</span></p>
                    <p>
                      Institute Alumni Contribution: <span className=' font-semibold'> {fee.display_institute_alumni_contribution ? fee.institute_alumni_contribution : ' ---'}</span>
                    </p>
                    <p>Book Bank: <span className=' font-semibold'> {fee.display_book_bank ? fee.book_bank : ' ---'}</span></p>
                    <p>Total Fee: <span className=' font-semibold'> {fee.total_fee}</span></p>
                  </div>
                ))}
              <div className='flex justify-center gap-10'>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-110">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:scale-110">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
        <button className="px-4 py-2 m-5 bg-purple-500 hover:bg-purple-400 text-white rounded-md">
        Add a batch fee
      </button>
    </>
  );
};

export default Fees;
