import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BilldeskOrders from './BilldeskOrders';
import BilldeskTransactions from './BilldeskTransactions';
import Fees from './Fees';
import SplitPaymentApproval from './SplitPaymentApproval';
import SubmittedFees from './SubmittedFees';
import Loading from '../Loading';

const FeesComponentAdmin = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/fee-admin-login');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-slate-300 h-[100%]'>
      <div className="p-5 w-[90%] m-auto">
        <div className="mb-8">
          <Link to={'/fee-comp-admin'} onClick={() => setSelectedComponent(null)}>
            <h1 className="text-xl hover:bg-gray-100 text-blue-900 w-fit p-2 rounded font-semibold bg-gray-200">Admin Dashboard</h1>
          </Link>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
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
                    <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('Fees')}>Add Batchwise Fees</button>
                  </li>
                  <li className="mb-2">
                    <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('SplitPaymentApproval')}>Split Payment Approval</button>
                  </li>
                  <li className="mb-2">
                    <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('SubmittedFees')}>See Submitted Fees</button>
                  </li>
                  <button onClick={handleLogout}>
                    <li className="mb-2">
                      <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100">Logout</button>
                    </li>
                  </button>
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
                <>
                  <div className="text-center">
                    <h2 className="text-4xl font-semibold mb-4">Welcome, Admin</h2>
                    <p className="text-lg m-5">Select an option from menu to get started.</p>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div onClick={() => setSelectedComponent('BilldeskOrders')} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105">
                      <h3 className="text-lg font-semibold mb-2">Billdesk Orders →</h3>
                      <p className="text-sm">View all Billdesk orders.</p>
                    </div>
                    <div onClick={() => setSelectedComponent('BilldeskTransactions')} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105">
                      <h3 className="text-lg font-semibold mb-2">Billdesk Transactions →</h3>
                      <p className="text-sm">View successful transactions on billdesk.</p>
                    </div>
                    <div onClick={() => setSelectedComponent('Fees')} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105">
                      <h3 className="text-lg font-semibold mb-2">Add Batchwise Fees →</h3>
                      <p className="text-sm">Manage and add fees as per batch.</p>
                    </div>
                    <div onClick={() => setSelectedComponent('SplitPaymentApproval')} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105">
                      <h3 className="text-lg font-semibold mb-2">Split Payment Approval →</h3>
                      <p className="text-sm">Approve or remove split payments requests.</p>
                    </div>
                    <div onClick={() => setSelectedComponent('SubmittedFees')} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105">
                      <h3 className="text-lg font-semibold mb-2">View Submitted Fees →</h3>
                      <p className="text-sm">See final submitted fees details.</p>
                    </div>
                    <button onClick={handleLogout} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105 flex items-center justify-center" >
                      <h3 className="text-lg font-semibold mb-2">Logout →</h3>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesComponentAdmin;