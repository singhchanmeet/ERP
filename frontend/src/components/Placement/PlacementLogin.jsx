import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import maitlogomain from '../../assets/maitlogomain.png';

const PlacementLogin = () => {
    const [user_id, setUser_id] = useState('');
    const [password, setPassword] = useState('');
    const host = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate();
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Student', href: '#' },
        { name: 'Infrastructure', href: '/infra-login' },
        { name: 'Accounts', href: '/fee-admin-login' },
        { name: 'Placement', href: '/placement-login' },
        { name: 'About', href: '#' },
    ];

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${host}/student/login/`, {
                user_id,
                password,
            });
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            const role = response.data.role;

            if (role === 'placementofficer' && role === 'PLACEMENTOFFICER') {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                navigate('/placement-dashboard');
            } else {
                alert('You are not authorized to login.');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <nav className="flex items-center bg-gray-900 justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to={'/'}><img src={maitlogomain} alt="" className='w-20 ' /></Link>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link to={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700">
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to Placement Portal
            </h2>
            <form onSubmit={handleLogin} className='m-5 grid grid-cols-1 place-items-center'>
                <div>
                    <div className='text-xl my-2'>
                        <label htmlFor="user_id">User Name:</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={user_id}
                        id='user_id'
                        onChange={(e) => setUser_id(e.target.value)}
                    />
                </div>
                <div>
                    <div className='text-xl my-2'>
                        <label htmlFor="password">Password:</label>
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-purple-500 my-3 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            </form>
        </>
    );
};

export default PlacementLogin;
