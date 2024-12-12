import { gql } from 'apollo-server';
import { userTypeDefs } from './user';
import { feedingTypeDefs } from './feeding';
import { authTypeDefs } from './auth';
import { blogTypeDefs } from './blog';

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  feedingTypeDefs,
  authTypeDefs,
  blogTypeDefs,
];
