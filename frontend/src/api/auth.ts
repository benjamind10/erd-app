import { gql } from '@apollo/client';
import client from './client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

// Function to handle user login
export const login = async (email: string, password: string) => {
  try {
    const response = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    console.log(response.data);

    const { token, user } = response.data.login;
    localStorage.setItem('token', token);

    return { token, user };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Utility function to get the token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};
