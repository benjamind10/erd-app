import { gql } from '@apollo/client';
import client from './client';

// GraphQL mutation for login
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        roles # Ensure roles are included in the query
      }
    }
  }
`;

// Function to handle user login
export const login = async (email: string, password: string) => {
  try {
    // Send login mutation request
    const response = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    // Extract data from the response
    const { token, user } = response.data.login;

    // Store the token and roles in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(user.roles));

    console.log('Login successful:', { token, user });
    return { token, user };
  } catch (error: any) {
    console.error('Error logging in:', error.message || error);
    throw error;
  }
};

// Utility function to get the token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Utility function to get roles from localStorage
export const getRoles = (): string[] => {
  const roles = localStorage.getItem('roles');
  return roles ? JSON.parse(roles) : [];
};
