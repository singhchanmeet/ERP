import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import maitlogomain from '../../assets/maitlogomain.png';
import Loading from '../Loading';
import PlacementAll from './PlacementAll'
import PlacementPast from './PlacementPast'
import PlacementActive from './PlacementActive'
import PlacementAnnouncement from './PlacementAnnouncement'

const PlacementDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
          <div className="mb-8">
            <Link to={'/placements-dashboard'} onClick={() => setSelectedComponent(null)}>
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
                      <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('ActivePlacements')}>Split Payment Approval</button>
                    </li>
                    <li className="mb-2">
                      <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('PastPlacements')}>Past Placements</button>
                    </li>
                    <li className="mb-2">
                      <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100" onClick={() => setSelectedComponent('AnnouncementsPlacements')}>View All Announcements</button>
                    </li>
                    <button onClick={handleLogout}>
                      <li className="mb-2">
                        <button className="block py-2 px-4 text-blue-900 font-semibold rounded hover:bg-gray-100">Logout</button>
                      </li>
                    </button>
                  </ul>
                </div>
              </div>
              <div className='flex-1 text-center'>
                {selectedComponent === 'AllPlacements' && <PlacementAll />}
                {selectedComponent === 'PastPlacements' && <PlacementPast />}
                {selectedComponent === 'ActivePlacements' && <PlacementActive />}
                {selectedComponent === 'AnnouncementsPlacements' && <PlacementAnnouncement />}
                {selectedComponent === null && (
                  <>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>hi</div>
                      <div>ji</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlacementDashboard;