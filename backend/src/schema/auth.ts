import { gql } from 'apollo-server';

export const authTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }
`;

