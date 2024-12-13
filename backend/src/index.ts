import { ApolloServer, AuthenticationError } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // To decode JWT
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

// Load environment variables
dotenv.config();

const { MONGODB_URI, PORT, FRONTEND_URL, JWT_SECRET } = process.env;

// Ensure essential environment variables are loaded
if (!MONGODB_URI || !JWT_SECRET) {
  throw new Error('❌ Required environment variables are not defined');
}

// Main function to initialize and start the server
const startServer = async () => {
  try {
    // MongoDB connection
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Apollo Server setup
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];

        const operationName = req.body.operationName;
        if (['Login', 'Register'].includes(operationName)) {
          console.log(
            `${operationName} mutation does not require authentication`
          );
          return {}; // Skip context for login/register
        }

        if (!token) {
          console.error('No token provided');
          throw new AuthenticationError('No token provided');
        }

        try {
          const user = jwt.verify(token, JWT_SECRET);
          console.log('Authenticated user:', user);
          return { user };
        } catch (error) {
          console.error(
            'Invalid token:',
            error instanceof Error ? error.message : error
          );
          throw new AuthenticationError('Invalid token');
        }
      },
      cors: {
        origin: FRONTEND_URL,
        credentials: true,
      },
    });

    // Start the server
    const { url } = await server.listen({
      port: PORT || 4000,
      host: '0.0.0.0',
    });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error starting the server:', error.message);
    } else {
      console.error('❌ Unknown error starting the server:', error);
    }
    process.exit(1);
  }
};

// Start the server
startServer();
