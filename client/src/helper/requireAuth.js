import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import Unauthorized from '../Layouts/components/unauthorized';

const RequireAuth = ({ allowedRoles }) => {
  const token = Cookies.get('token');
  let user = null;

  try {
    user = JSON.parse(Cookies.get('user'));
  } catch (error) {
    console.error('Error parsing user data:', error);
    return <Navigate to="/login" />;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Unauthorized />;
  }

  return <Outlet />;
};

export default RequireAuth;
