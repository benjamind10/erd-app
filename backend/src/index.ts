import { config } from 'dotenv';
config();

import * as R from 'ramda';

import { isNilOrEmpty, exitWithError } from './utilities/helpers';
import { connectToMongoDB } from './utilities/database';
import { createApolloServer, startApolloServer } from './utilities/server';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

// Load MongoDB URI from environment variables
const { MONGODB_URI } = process.env;

/**
 * Main function to initialize and start the server.
 * This function checks for the necessary environment variables,
 * connects to the MongoDB database, and starts the Apollo Server.
 */
const startServer = async () => {
  // Check if the MongoDB URI is defined
  if (isNilOrEmpty(MONGODB_URI)) {
    exitWithError('❌ MONGODB_URI is not defined in the environment variables');
  }

  try {
    /**
     * Compose server initialization steps using Ramda's pipeWith.
     * The steps are asynchronous and involve:
     * 1. Connecting to MongoDB.
     * 2. Creating the Apollo Server with the specified schema and resolvers.
     * 3. Starting the Apollo Server.
     */
    await R.pipeWith(R.andThen, [
      connectToMongoDB,
      () => createApolloServer({ typeDefs, resolvers }),
      startApolloServer,
    ])(MONGODB_URI as string);
  } catch (error) {
    console.error('❌ Error starting the server:', error);
  }
};

// Start the server
startServer();

