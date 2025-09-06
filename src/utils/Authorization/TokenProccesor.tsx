import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TokenProccesor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    }
    navigate('/', { replace: true });
  }, []);
  return <></>;
};

export default TokenProccesor;
