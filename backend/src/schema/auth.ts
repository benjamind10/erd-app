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

  type Query {
    _placeholder: String # Placeholder query to satisfy Apollo's requirements
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(name: String!, email: String!, password: String!): AuthPayload!
  }
`;
