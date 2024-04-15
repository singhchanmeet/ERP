import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';

function BilldeskTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const host = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${host}/fee/feerouterbilldesktransaction/`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setCurrentPage(1);
  };

  const handleSortByTransactionTime = () => {
    const sortedTransactions = [...transactions];
    sortedTransactions.sort((a, b) => {
      if (sortBy === 'asc') {
        return new Date(a.transaction_time) - new Date(b.transaction_time);
      } else {
        return new Date(b.transaction_time) - new Date(a.transaction_time);
      }
    });
    setTransactions(sortedTransactions);
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  const formatTime = (timeString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(timeString).toLocaleString('en-US', options);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.order_id.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.transaction_id.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.transaction_amount.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.transaction_status.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.payment_method.toLowerCase().includes(filterText.toLowerCase()) ||
    transaction.transaction_time.toLowerCase().includes(filterText.toLowerCase())
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Completed Billdesk Transactions</h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        value={filterText}
        onChange={handleFilterChange}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
                  ORDER ID
                </th>
                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
                  TRANSACTION ID
                </th>
                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
                  TRANSACTION AMOUNT
                </th>
                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
                  TRANSACTION STATUS
                </th>
                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
                  PAYMENT METHOD
                </th>
                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByTransactionTime}>
                  TRANSACTION TIME
                  {sortBy === 'asc' ? ' ↑' : ' ↓'}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr key={transaction.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                  <td className="border border-gray-300 px-4 py-2">{transaction.order_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{transaction.transaction_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{transaction.transaction_amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{transaction.transaction_status}</td>
                  <td className="border border-gray-300 px-4 py-2">{transaction.payment_method}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatTime(transaction.transaction_time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <ul className="flex">
              {Array.from({ length: Math.ceil(filteredTransactions.length / transactionsPerPage) }).map((_, index) => (
                <li key={index} className="cursor-pointer px-3 py-1 bg-gray-200 border border-gray-300 mx-1" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default BilldeskTransactions;
