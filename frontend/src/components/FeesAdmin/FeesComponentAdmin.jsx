import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BilldeskOrders from './BilldeskOrders';
import BilldeskTransactions from './BilldeskTransactions';
import Fees from './Fees';
import SplitPaymentApproval from './SplitPaymentApproval';
import SubmittedFees from './SubmittedFees';

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
        <div role="status" className='w-screen flex justify-center'>
          <svg aria-hidden="true" className="w-40 h-40 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
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