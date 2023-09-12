// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, DetailsForm, EmployeeApply, EmployeeLogin, EmployeePortal, EmployeeRegistration, Footer, Navbar, StudentAdmission, StudentLogin, StudentPortal, StudentRegistration } from './components/bundle';
import StudentDashboard from './components/Student Portal/StudentDashboard';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employee" element={<EmployeePortal />} />

                <Route path="/employee/login" element={<EmployeeLogin />} />
                <Route path="/employee/register" element={<EmployeeRegistration />} />
                <Route path="/employee/apply" element={<EmployeeApply />} />
                <Route path="/student" element={<StudentPortal />} />
                <Route path="/student/login" element={<StudentLogin />} />
                <Route path="/student/register" element={<StudentRegistration />} />
                <Route path="/student/admission" element={<StudentAdmission />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/detailsform" element={<DetailsForm />} />
                {/* Add more routes as needed */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
