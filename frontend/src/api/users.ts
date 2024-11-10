import { gql } from '@apollo/client';
import client from './client'; // Ensure this points to your Apollo Client instance

// GraphQL query to fetch a single user by ID
export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
    }
  }
`;

// GraphQL query to fetch multiple users by an array of IDs
export const GET_USERS_BY_IDS = gql`
  query GetUsersByIds($ids: [ID!]!) {
    getUsers(ids: $ids) {
      id
      name
      email
    }
  }
`;

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields if necessary
}

/**
 * Fetches a single user by ID.
 * @param id - The ID of the user to fetch.
 * @returns A promise that resolves to a User object.
 */
export const getUserById = async (id: string): Promise<User> => {
  try {
    const { data } = await client.query<{ user: User }>({
      query: GET_USER_BY_ID,
      variables: { id },
      fetchPolicy: 'network-only', // Ensures fresh data
    });
    return data.user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches multiple users by their IDs.
 * @param ids - An array of user IDs to fetch.
 * @returns A promise that resolves to an array of User objects.
 */
export const getUsersByIds = async (ids: string[]): Promise<User[]> => {
  try {
    const { data } = await client.query<{ users: User[] }>({
      query: GET_USERS_BY_IDS,
      variables: { ids },
      fetchPolicy: 'network-only', // Ensures fresh data
    });
    return data.users;
  } catch (error) {
    console.error(`Error fetching users with IDs ${ids.join(', ')}:`, error);
    throw error;
  }
};
