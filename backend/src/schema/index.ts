import { gql } from 'apollo-server';
import { userTypeDefs } from './user';

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [rootTypeDefs, userTypeDefs];
