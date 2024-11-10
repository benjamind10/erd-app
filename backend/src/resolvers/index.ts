import { userResolvers } from './user';
import { feedingResolvers } from './feeding';
import { authResolvers } from './auth';

export const resolvers = [userResolvers, feedingResolvers, authResolvers];
