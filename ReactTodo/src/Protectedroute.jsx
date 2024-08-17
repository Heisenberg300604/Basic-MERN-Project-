import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../src/main';

const ProtectedRoute = ({ element: Component }) => {
    const { isAuthenticated } = useContext(Context);

    return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
