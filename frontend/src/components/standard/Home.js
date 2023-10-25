import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="h-screen flex flex-col px-[30px] py-10 bg-gray-100">
            <h1 className="text-2xl font-semibold mb-4">Welcome to College ERP</h1>
            <div className="grid grid-rows-2 gap-4">
                <Link to="/student" className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Student Portal</h2>
                    <p>Login, Register, and more</p>
                </Link>
                <Link to="/employee" className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Employee Portal</h2>
                    <p>Login, Register, and apply</p>
                </Link>
            </div>
        </div>
    );
}

export default Home;
