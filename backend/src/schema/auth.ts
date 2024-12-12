import { gql } from 'apollo-server';

export const authTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    roles: [String!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      roles: [String]
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateUserRoles(userId: ID!, roles: [String!]!): User
  }
`;
