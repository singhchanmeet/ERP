import React, { useState } from 'react';
import axios from 'axios';

const AccountsLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const host = process.env.REACT_APP_BACKEND_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${host}/endpoint-with-accounts-role-credentials`, {
                username,
                password,
            });
            const { token, role } = response.data;

            if (role === 'accounts-admin') {
                localStorage.setItem('token', token);
                window.location.href = '/fee-comp-admin';
            } else {
                alert('You are not authorized to login.');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign In to Accounts Admin Portal
            </h2>
            <form onSubmit={handleLogin} className='m-5 grid grid-cols-1 place-items-center '>
                <div>
                    <div className='text-xl my-2'>
                        <label htmlFor="username">User Name:</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        id='username'
                        onChange={(e) => setUsername(e.target.value)}
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

export default AccountsLogin;