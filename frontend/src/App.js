// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DetailsForm, Home, Dashboard, EmployeeApply, EmployeeLogin, EmployeePortal, EmployeeRegistration, Footer, Navbar, StudentAdmission, StudentLogin, StudentPortal, StudentRegistration } from './components/bundle';
import ComingSoon from './components/ComingSoon';
import MicrosoftLoginCallback from './components/standard/MicrosoftLoginCallback';
import AuthContext from './context/auth/authContext';
import AuthState from './context/auth/authState';



function App() {
    return (
        <Router>
            <AuthState>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employee" element={<ComingSoon />} />
                    <Route path="/employee/login" element={<EmployeeLogin />} />
                    <Route path="/employee/register" element={<ComingSoon />} />
                    <Route path="/employee/apply" element={<EmployeeApply />} />
                    <Route path="/student" element={<StudentPortal />} />
                    <Route path="/login" element={<StudentLogin />} />
                    <Route path="/student/register" element={<ComingSoon />} />
                    <Route path="/student/admission" element={<ComingSoon />} />
                    <Route path="/form" element={<DetailsForm />} />
                    <Route path="/call_back" element={<MicrosoftLoginCallback />} />
                    {/* Add more routes as needed */}
                </Routes>
                <Footer />
            </AuthState>
        </Router>
    );
}

export default App;
