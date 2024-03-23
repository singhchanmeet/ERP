import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SplitPaymentApproval() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const accessToken = localStorage.getItem('accessToken');
  const host = process.env.REACT_APP_BACKEND_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://admin.erp.mait.ac.in/fee/split-payment/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setStudents([]); 
    }
  };

  const handleApproval = async (studentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const host = process.env.REACT_APP_BACKEND_URL;
      await axios.post(
        `https://admin.erp.mait.ac.in/fee/split-payment/${studentId}/approve/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchData(); 
    } catch (error) {
      console.error('Error approving split payment:', error);
    }
  };

  return (
    <div>
      <h1>Split Payment Approval</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Application</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.application}</td>
              <td>
                <button onClick={() => handleApproval(student.id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SplitPaymentApproval;
