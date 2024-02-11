import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DetailsForm, Home, Dashboard, EmployeeApply, EmployeeLogin, EmployeePortal, EmployeeRegistration, Footer, Navbar, StudentAdmission, StudentLogin, StudentPortal, StudentRegistration } from './components/bundle';
import ComingSoon from './components/ComingSoon';
import MicrosoftLoginCallback from './components/standard/MicrosoftLoginCallback';
import AuthState from './context/auth/authState';
import StudentDetails from './components/Student Portal/StudentDetails';
import EmployeeDetailsForm from './components/Employee Portal/EmployeeDetailsForm';
import InfraLogin from './components/Infra/InfraLogin';
import InfraForm from './components/Infra/InfraForm';
import ManagingDashboard from './components/Infra/ManagingDashboard';
import InfraData from './components/Infra/InfraData';
import DisplayFees from './components/Fees/DisplayFees';
import BilldeskPayment from './components/Fees/BilldeskPayment';

function App() {
    return (
        <Router>
            <AuthState>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employee" element={<ComingSoon />} />
                    <Route path="/employee/apply" element={<EmployeeApply />} />
                    <Route path="/student" element={<StudentPortal />} />
                    <Route path="/login" element={<StudentLogin />} />
                    <Route path="/student/register" element={<ComingSoon />} />
                    <Route path="/student/admission" element={<ComingSoon />} />
                    <Route path="/student-details-form" element={<DetailsForm />} />
                    <Route path="/employee-details-form" element={<EmployeeDetailsForm />} />
                    <Route path="/student-details" element={<StudentDetails />} />
                    <Route path="/call_back" element={<MicrosoftLoginCallback />} />
                    <Route path="/infra-login" element={<InfraLogin />} />
                    <Route path="/infra-form" element={<InfraForm />} />
                    <Route path="/infra-data" element={<InfraData />} />
                    <Route path="/manage-infra" element={<ManagingDashboard />} />
                    <Route path="/display-fee" element={<DisplayFees />} />
                    <Route path="/pay-fee" element={<BilldeskPayment />} />
                    {/* Add more routes as needed */}
                </Routes>
                <Footer />
            </AuthState>
        </Router>
    );
}

export default App;
