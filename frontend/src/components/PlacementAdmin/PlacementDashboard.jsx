import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import maitlogomain from '../../assets/maitlogomain.png';
import AllPlacements from '../PlacementAdmin/AllPlacements';
import ArchivedPlacements from '../PlacementAdmin/ArchivedPlacements';
import AnnouncementsPlacement from '../PlacementAdmin/AnnouncementsPlacement';

const PlacementDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const navigate = useNavigate();
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Student', href: '#' },
        { name: 'Infrastructure', href: '/infra-login' },
        { name: 'Accounts', href: '/fee-admin-login' },
        { name: 'Placement', href: '/placement-login' },
        { name: 'About', href: '#' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/placement-login');
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
            <div className='flex-1 text-center'>
                {selectedComponent === 'AllPlacements' && <AllPlacements />}
                {selectedComponent === 'ArchivedPlacements' && <ArchivedPlacements />}
                {selectedComponent === 'AnnouncementsPlacement' && <AnnouncementsPlacement />}
                {selectedComponent === null && (
                    <>
                        <div className="text-center mt-5">
                            <h2 className="text-4xl font-semibold mb-4">Welcome, Admin</h2>
                            <p className="text-lg m-5">Select an option from menu to get started.</p>
                        </div>
                        <div className='grid grid-cols-2 gap-4 m-10'>
                            <div onClick={() => setSelectedComponent('AllPlacements')} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105">
                                <h3 className="text-lg font-semibold mb-2">All Placements →</h3>
                                <p className="text-sm">Add, edit & delete placement details.</p>
                            </div>
                            <div onClick={() => setSelectedComponent('ArchivedPlacements')} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105">
                                <h3 className="text-lg font-semibold mb-2">Archived Placements →</h3>
                                <p className="text-sm">Archive already added placements.</p>
                            </div>
                            <div onClick={() => setSelectedComponent('AnnouncementsPlacement')} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105">
                                <h3 className="text-lg font-semibold mb-2">Annoucements →</h3>
                                <p className="text-sm">Manage and add annoucements.</p>
                            </div>
                            <button onClick={handleLogout} className="bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer rounded-lg hover:scale-105 flex items-center justify-center" >
                                <h3 className="text-lg font-semibold mb-2">Logout →</h3>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default PlacementDashboard;
