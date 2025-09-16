import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { hasToken, isOnboardingDone } from '../../utils/authState';

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const token = hasToken();
  const done = isOnboardingDone();

  if (location.pathname.startsWith('/login')) return <>{children}</>;
  if (location.pathname.startsWith('/onboarding')) return <>{children}</>;
  if (location.pathname.startsWith('/oauth2/redirect')) return <>{children}</>;

  if (!token) {
    if (!done) return <Navigate to="/onboarding" replace />;
    return <Navigate to="/login" replace />;
  }

  if (token && !done) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default AuthGate;
