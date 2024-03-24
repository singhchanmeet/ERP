import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BilldeskOrders from './BilldeskOrders';
import BilldeskTransactions from './BilldeskTransactions';
import Fees from './Fees';
import SplitPaymentApproval from './SplitPaymentApproval';
import SubmittedFees from './SubmittedFees';
import Loading from '../Loading';

const FeesComponentAdmin = () => {
  const [feesStatus, setFeesStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const host = process.env.REACT_APP_BACKEND_URL;
  const accessToken = localStorage.getItem('accessToken');
  const [selectedComponent, setSelectedComponent] = useState(null);
  useEffect(() => {
    axios.get(`${host}/fee/paid/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        setFeesStatus(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [accessToken]);
  if (loading) {
    return (
      <>
        <Loading/>
      </>);
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='bg-slate-300 h-[100%]'>
      <div className="p-5  w-[90%] m-auto">
        <div className="mb-8">
          <Link to={'/fee-comp-admin'} onClick={() => setSelectedComponent(null)} ><h1 className="text-xl hover:bg-gray-100 text-blue-900  w-fit p-2 rounded font-semibold bg-gray-200">Admin Dashboard</h1></Link>
        </div>
        <div className='flex gap-8 justify-between'>
          <div>
            <div className="bg-gray-200 p-4">
              <ul>
                <li className="mb-2">
                  <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('BilldeskOrders')}>Billdesk Orders</button>
                </li>
                <li className="mb-2">
                  <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('BilldeskTransactions')}>Billdesk Transactions</button>
                </li>
                <li className="mb-2">
                  <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('Fees')}>Fees</button>
                </li>
                <li className="mb-2">
                  <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('SplitPaymentApproval')}>Split Payment Approval</button>
                </li>
                <li className="mb-2">
                  <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('SubmittedFees')}>Submitted Fees</button>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex-1 text-center'>
            {selectedComponent === 'BilldeskOrders' && <BilldeskOrders />}
            {selectedComponent === 'BilldeskTransactions' && <BilldeskTransactions />}
            {selectedComponent === 'Fees' && <Fees />}
            {selectedComponent === 'SplitPaymentApproval' && <SplitPaymentApproval />}
            {selectedComponent === 'SubmittedFees' && <SubmittedFees />}
            {selectedComponent === null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Welcome, Admin</h2>
                <p className="text-lg m-2">Select an option from menu to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesComponentAdmin;