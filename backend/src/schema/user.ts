
import { gql } from 'apollo-server';

/**
 * GraphQL schema definition for the User entity.
 * This schema defines the User type, and provides
 * queries and mutations to interact with user data.
 */
export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    updateUserName(id: ID!, name: String!): User!  # Only updates the name field
    deleteUser(id: ID!): Boolean!
  }
`;

