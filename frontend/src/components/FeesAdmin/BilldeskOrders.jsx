import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';

function BilldeskOrders() {
  const [orders, setOrders] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://admin.erp.mait.ac.in/fee/feerouterbilldeskorder/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleSortByOrderTime = () => {
    const sortedOrders = [...orders];
    sortedOrders.sort((a, b) => {
      if (sortBy === 'asc') {
        return new Date(a.order_time) - new Date(b.order_time);
      } else {
        return new Date(b.order_time) - new Date(a.order_time);
      }
    });
    setOrders(sortedOrders);
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  const formatTime = (timeString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(timeString).toLocaleString('en-US', options);
  };

  const filteredOrders = orders.filter(order =>
    order.order_id.toLowerCase().includes(filterText.toLowerCase()) ||
    order.bd_order_id.toLowerCase().includes(filterText.toLowerCase()) ||
    order.order_amount.toLowerCase().includes(filterText.toLowerCase()) ||
    order.order_time.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Billdesk Orders</h1>
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
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByOrderTime}>
                ORDER ID
              </th>
              <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByOrderTime}>
                BD ORDER ID
              </th>
              <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByOrderTime}>
                ORDER AMOUNT
              </th>
              <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSortByOrderTime}>
                ORDER TIME
                {sortBy === 'asc' ? ' ↑' : ' ↓'}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td className="border border-gray-300 px-4 py-2">{order.order_id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.bd_order_id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.order_amount}</td>
                <td className="border border-gray-300 px-4 py-2">{formatTime(order.order_time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
    </div>
  );
}

export default BilldeskOrders;
