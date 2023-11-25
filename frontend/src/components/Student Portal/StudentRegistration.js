import React, { useState } from 'react';
import axios from 'axios';

function StudentRegistration() {
    const [user_id, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact_number, setContactNo] = useState('');
    const [password, setPassword] = useState('');
    const role = 'STUDENT';

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://erp.mait.ac.in/backend/student/register/', {
                user_id,
                name,
                email,
                contact_number,
                password,
                role,
            });

            // Assuming the server returns a success message upon registration
            console.log('Registration successful:', response.data.message);
            alert('registration successful')
        } catch (error) {
            console.error('Registration error:', error);
            // Handle error and show appropriate message to the user
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Student Registration</h2>
            <form className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    placeholder="Student ID"
                    className="p-2 border rounded"
                    value={user_id}
                    onChange={(e) => setStudentId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    className="p-2 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    className="p-2 border rounded"
                    value={contact_number}
                    onChange={(e) => setContactNo(e.target.value)}
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
                    onClick={handleRegister}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default StudentRegistration;