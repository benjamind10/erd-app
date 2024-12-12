import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

// Load environment variables
dotenv.config();

const { MONGODB_URI, PORT, FRONTEND_URL } = process.env;

// Ensure essential environment variables are loaded
if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in the environment variables');
}

// Main function to initialize and start the server
const startServer = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      cors: {
        origin: FRONTEND_URL,
        credentials: true,
      },
    });

    // Start the server and make it accessible from anywhere
    const { url } = await server.listen({
      port: PORT || 4000,
      host: '0.0.0.0',
    });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('❌ Error starting the server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
