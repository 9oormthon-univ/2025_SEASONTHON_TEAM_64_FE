import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../apis/member';

const RoleBootstrap: React.FC = () => {
  const location = useLocation();
  const {
    data: memberData,
    isLoading,
    isError,
  } = useApiQuery(getMemberDetail(), ['member']);

  if (isLoading) return null;
  if (isError || !memberData) return <Navigate to="/login" replace />;
  if (memberData.role === 'ROLE_ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  if (memberData.role === 'ROLE_USER') {
    if (!memberData.mode) {
      return <Navigate to="/user" replace />;
    }
    if (location.pathname === '/') {
      return <></>;
    }
    return <></>;
  }
  return <Navigate to="/login" replace />;
};

export default RoleBootstrap;
