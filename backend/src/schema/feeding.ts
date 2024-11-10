import { gql } from 'apollo-server';

export const feedingTypeDefs = gql`
  type Feeding {
    id: ID!
    feedingTime: String!
    addedAt: String!
    updatedAt: String!
    addedBy: ID!
    editedBy: ID
    amount: Float!
    dha: Boolean
  }

  type Query {
    getFeeding(id: ID!): Feeding
    getFeedings: [Feeding!]!
    getTodaysFeedings: [Feeding!]!
  }

  type Mutation {
    createFeeding(feedingTime: String!, amount: Float!, dha: Boolean): Feeding!
    updateFeeding(id: ID!, feedingTime: String!, amount: Float, dha: Boolean): Feeding!
    deleteFeeding(id: ID!): Boolean!
  }
`;

