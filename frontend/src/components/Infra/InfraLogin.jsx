import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import maitlogomain from '../../assets/maitlogomain.png'
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
const InfraLogin = () => {
    const navigate = useNavigate();
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Student', href: '#' },
        { name: 'Infrastructure', href: '/infra-login' },
        { name: 'About', href: '#' },
    ];
    const [user_id, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const context = useContext(AuthContext);
    const { handleLogin } = context;

    const handleInfraLogin = async () => {
        try {
            const response = await axios.post('https://admin.erp.mait.ac.in/student/login/', {
                user_id,
                password,
            });
            // Assuming the response includes 'access_token' and 'refresh_token'
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            // Store tokens in local storage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Redirect or perform other actions upon successful login
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
            alert('Incorrect Credentials')
        }
    };

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center bg-gray-900 justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">

                        <Link to={'/'}><img src={maitlogomain} alt="" className='w-20 ' /></Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="text-white h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link to={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to={'/'}><img src={maitlogomain} alt="" className='w-20 ' /></Link>

                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className=" text-white h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link to={item.href}
                                            key={item.name}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-orange-100 hover:bg-gray-700"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a onClick={handleLogin}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-orange-100 hover:bg-gray-700"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        className="mx-auto h-10 w-auto"
                        src= 
                        alt="Infrastructure Login"
                    /> */}
                    <br /><br />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign In to Infrastructure Portal
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="userid" className="block text-sm font-medium leading-6 text-gray-900">
                                User Id
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userid"
                                    required
                                    name='userid'
                                    type="text"
                                    value={user_id} onChange={(e) => setUserId(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="button" onClick={handleInfraLogin}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default InfraLogin

