import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MicrosoftLoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    if (status === 'success' && accessToken && refreshToken) {
      // Tokens are available, you can save them to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Redirect to the dashboard or another page
      navigate('/dashboard'); // Use navigate from react-router-dom
    } else {
      // Handle the case where tokens are missing or the status is not 'success'
      console.error('Microsoft login failed or tokens missing.');
      navigate('/dashboard'); // Redirect to a login page or handle the error
    }
  }, [navigate]);

  return (
    <div>
      Please Wait, redirecting...
    </div>
  );
};

export default MicrosoftLoginCallback;
