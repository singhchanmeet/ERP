import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function SubmittedFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredGroup, setFilteredGroup] = useState('');
  const [filteredBatch, setFilteredBatch] = useState('');
  const [filteredBranch, setFilteredBranch] = useState('');
  const [groups, setGroups] = useState([]);
  const [batches, setBatches] = useState([]);
  const [branches, setBranches] = useState([]);
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feesResponse = await axios.get(`${host}/fee/feerouterstudentfees/`);
        setFees(feesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fees:', error);
        setLoading(false);
      }
    };

    const fetchGroupsBatchesBranches = async () => {
      try {
        const groupsResponse = await axios.get(`${host}/groups/get-all/`);
        const batchesResponse = await axios.get(`${host}/batches/get-all/`);
        const branchesResponse = await axios.get(`${host}/branches/get-all/`);

        setGroups(groupsResponse.data.groups || []);
        setBatches(batchesResponse.data.batches || []);
        setBranches(branchesResponse.data.branches || []);
      } catch (error) {
        console.error('Error fetching groups, batches, and branches:', error);
      }
    };

    fetchData();
    fetchGroupsBatchesBranches();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterGroup = (e) => {
    setFilteredGroup(e.target.value);
  };

  const handleFilterBatch = (e) => {
    setFilteredBatch(e.target.value);
  };

  const handleFilterBranch = (e) => {
    setFilteredBranch(e.target.value);
  };

  const filteredFees = fees.filter((fee) =>
    fee.enrollment_number.includes(searchText) &&
    (filteredGroup ? fee.group === filteredGroup : true) &&
    (filteredBatch ? fee.batch === filteredBatch : true) &&
    (filteredBranch ? fee.branch === filteredBranch : true)
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Enrollment Number', 'Group', 'Batch', 'Branch', 'Transaction ID', 'Transaction Amount', 'Transaction Status']],
      body: filteredFees.map((fee) => [fee.id, fee.enrollment_number, fee.group, fee.batch, fee.branch, fee.transaction_id, fee.transaction_amount, fee.transaction_status]),
    });
    doc.save('submitted_fees.pdf');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submitted Fees</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Enrollment Number"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="flex justify-around mb-4">
        <select
          className="px-10 py-2 border border-gray-300 rounded-md "
          onChange={handleFilterGroup}
          value={filteredGroup}
        >
          <option value="">Filter by Group</option>
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <select
          className="px-10 py-2 border border-gray-300 rounded-md "
          onChange={handleFilterBatch}
          value={filteredBatch}
        >
          <option value="">Filter by Batch</option>
          {batches.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
        <select
          className="px-10 py-2 border border-gray-300 rounded-md "
          onChange={handleFilterBranch}
          value={filteredBranch}
        >
          <option value="">Filter by Branch</option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Enrollment Number</th>
            <th className="border border-gray-300 px-4 py-2">Group</th>
            <th className="border border-gray-300 px-4 py-2">Batch</th>
            <th className="border border-gray-300 px-4 py-2">Branch</th>
            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-300 px-4 py-2">Transaction Amount</th>
            <th className="border border-gray-300 px-4 py-2">Transaction Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredFees.map((fee, index) => (
            <tr key={fee.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
              <td className="border border-gray-300 px-4 py-2">{fee.id}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.enrollment_number}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.group}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.batch}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.branch}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.transaction_id}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.transaction_amount}</td>
              <td className="border border-gray-300 px-4 py-2">{fee.transaction_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDownloadPDF} className="px-4 py-2 m-5 bg-blue-500 text-white rounded-md">
        Download PDF
      </button>
    </div>
  );
}

export default SubmittedFees;
