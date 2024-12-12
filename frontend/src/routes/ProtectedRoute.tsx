import React from 'react';
import { Navigate } from 'react-router-dom';

// Utility function to get roles from localStorage
const getRoles = (): string[] => {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
};

interface ProtectedRouteProps {
    children: JSX.Element;
    requiredRoles?: string[]; // Roles required to access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRoles = [],
}) => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has the required roles
    const roles = getRoles();
    if (requiredRoles.length > 0 && !requiredRoles.some(role => roles.includes(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Render the child component if authenticated and authorized
    return children;
};

export default ProtectedRoute;
