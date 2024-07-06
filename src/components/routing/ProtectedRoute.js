import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../context/Store';

const ProtectedRoute = () => {
  const { userData } = useStore();

  return userData?.access ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;