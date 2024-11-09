import { gql } from 'apollo-server';
import { userTypeDefs } from './user';
import { feedingTypeDefs } from './feeding';

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [rootTypeDefs, userTypeDefs, feedingTypeDefs];
