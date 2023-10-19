// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DetailsForm, Home, Dashboard, EmployeeApply, EmployeeLogin, EmployeePortal, EmployeeRegistration, Footer, Navbar, StudentAdmission, StudentLogin, StudentPortal, StudentRegistration } from './components/bundle';
import ComingSoon from './components/ComingSoon';
import MicrosoftLoginCallback from './components/standard/MicrosoftLoginCallback';
import AuthContext from './context/auth/authContext';



function App() {
    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                return null; // No refresh token available, cannot refresh the access token
            }

            const response = await fetch('/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary headers (e.g., authorization header) for the token refresh request.
                },
                body: JSON.stringify({
                    refresh_token: refreshToken,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return data.access_token;
            }

            return null; // Token refresh failed
        } catch (error) {
            console.error('Error during token refresh:', error);
            return null; // Token refresh failed
        }
    };
    return (
        <Router>
            <AuthContext.Provider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employee" element={<ComingSoon />} />
                    <Route path="/employee/login" element={<EmployeeLogin />} />
                    <Route path="/employee/register" element={<ComingSoon />} />
                    <Route path="/employee/apply" element={<EmployeeApply />} />
                    <Route path="/student" element={<StudentPortal />} />
                    <Route path="/student/login" element={<StudentLogin />} />
                    <Route path="/student/register" element={<ComingSoon />} />
                    <Route path="/student/admission" element={<ComingSoon />} />
                    <Route path="/form" element={<DetailsForm />} />
                    <Route path="/call_back" element={<MicrosoftLoginCallback />} />
                    {/* Add more routes as needed */}
                </Routes>
                <Footer />
            </AuthContext.Provider>
        </Router>
    );
}

export default App;
