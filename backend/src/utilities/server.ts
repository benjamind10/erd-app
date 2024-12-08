import { ApolloServer } from 'apollo-server';
import { authTypeDefs } from '../schema/auth';
import { feedingResolvers } from '../resolvers/feeding';
import { feedingTypeDefs } from '../schema/feeding';
import { verifyToken } from './jwt';
import mongoose from 'mongoose';
import { authResolvers } from '../resolvers/auth';
import { config } from 'dotenv';
import cors from 'cors';
config();

const { MONGODB_URI } = process.env;

console.log(process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(error => console.error('❌ MongoDB connection error:', error));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs: [authTypeDefs, feedingTypeDefs],
  resolvers: [authResolvers, feedingResolvers],
  context: ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (token) {
      try {
        const user = verifyToken(token);
        return { user };
      } catch {
        throw new Error('Invalid or expired token');
      }
    }

    return {};
  },
  cors: {
    origin: 'http://192.168.1.254:3000', // Allow requests from your frontend
    credentials: true, // Enable sending cookies or authorization headers
  },
});

// Export the server for use in `index.ts`
export default server;
