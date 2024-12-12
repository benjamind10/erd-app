import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Utility function to get roles from localStorage
const getRoles = (): string[] => {
  try {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  } catch (error) {
    console.error('Failed to parse roles from localStorage:', error);
    return [];
  }
};

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRoles?: string[]; // Roles required to access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
}) => {
  const location = useLocation(); // Get the current location

  // Check if user is authenticated
  const token = localStorage.getItem('token');
  if (!token) {
    // Store the current path for post-login redirection
    localStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required roles
  const roles = getRoles();
  if (
    requiredRoles.length > 0 &&
    !requiredRoles.some(role => roles.includes(role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the child component if authenticated and authorized
  return children;
};

export default ProtectedRoute;
