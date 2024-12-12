import { userResolvers } from './user';
import { feedingResolvers } from './feeding';
import { authResolvers } from './auth';
import { blogResolvers } from './blog';

export const resolvers = [
  userResolvers,
  feedingResolvers,
  authResolvers,
  blogResolvers,
];
