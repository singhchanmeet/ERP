// src/components/StudentLogin.js
import React, { useState } from 'react';
import axios from 'axios';

function StudentLogin() {
    const [user_id, setStudentId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/student/login/', {
                user_id,
                password,
            });

            // Assuming the server returns a token upon successful login
            const token = response.data;
            // Save the token to localStorage or a global state for further use
            console.log('Logged in with token:', token.access);
            console.log('Logged in with token:', token.refresh);
        } catch (error) {
            console.error('Login error:', error);
            // Handle error and show appropriate message to the user
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Student Login</h2>
            <form className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    placeholder="Student ID"
                    className="p-2 border rounded"
                    value={user_id}
                    onChange={(e) => setStudentId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default StudentLogin;