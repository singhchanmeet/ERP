import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import maitlogomain from '../../assets/maitlogomain.png';
import Loading from '../Loading';
import PlacementAll from './PlacementAll';
import PlacementPast from './PlacementPast';
import PlacementActive from './PlacementActive';
import PlacementAnnouncement from './PlacementAnnouncement';
import axios from 'axios';

const PlacementStudent = () => {
    const host = process.env.REACT_APP_BACKEND_URL;
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
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
        localStorage.removeItem('token');
        navigate('/placement-login');
    };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get(`${host}/placements/announcement/`);
                setAnnouncements(response.data);
                // console.log(response.data)
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

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
            <div className='bg-slate-300 h-[100%]'>
                <div className="p-5 w-[90%] m-auto">
                    <div className="mb-8 inline-block">
                        <Link to={'/placement-student'} onClick={() => setSelectedComponent(null)}>
                            <h1 className="text-xl hover:bg-gray-100 text-blue-900 w-fit p-2 rounded font-semibold bg-gray-200">Placements Dashboard</h1>
                        </Link>
                    </div>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <div className='flex gap-8 justify-between'>
                            <div>
                                <div className="bg-gray-200 p-4">
                                    <ul>
                                        <li className="mb-2">
                                            <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('AllPlacements')}>All Placements</button>
                                        </li>
                                        <li className="mb-2">
                                            <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('ActivePlacements')}>Active Placements</button>
                                        </li>
                                        <li className="mb-2">
                                            <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('PastPlacements')}>Past Placements</button>
                                        </li>
                                        <li className="mb-2">
                                            <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('AnnouncementsPlacements')}>View All Announcements</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='flex-1 text-center'>
                                {selectedComponent === 'AllPlacements' && <PlacementAll />}
                                {selectedComponent === 'PastPlacements' && <PlacementPast />}
                                {selectedComponent === 'ActivePlacements' && <PlacementActive />}
                                {selectedComponent === 'AnnouncementsPlacements' && <PlacementAnnouncement />}
                                {selectedComponent === null && <PlacementAll />}
                            </div>
                            {selectedComponent !== 'AnnouncementsPlacements' && (
                                <div className="w-96 bg-gray-200 p-4 relative">
                                    <h2 className="text-2xl font-bold mb-6">Announcements</h2>
                                    {announcements && announcements.length > 0 ? (
                                        announcements.map((announcement) => (
                                            <div key={announcement.id}>
                                                <h3 className="text-lg font-semibold">{announcement.title}</h3>
                                                <hr className="my-2 border-gray-400" />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No announcements available.</p>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 flex justify-end mb-1">
                                        <button className="py-2 px-4 text-blue-900 hover:underline font-semibold" onClick={() => setSelectedComponent('AnnouncementsPlacements')}>View All...</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PlacementStudent;
