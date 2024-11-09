import { config } from 'dotenv';
config();

import * as R from 'ramda';

import { isNilOrEmpty, exitWithError } from './utilities/helpers';
import { connectToMongoDB } from './utilities/database';
import { createApolloServer, startApolloServer } from './utilities/server';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const { MONGODB_URI } = process.env;

// Main function to start the server
const startServer = async () => {
  if (isNilOrEmpty(MONGODB_URI)) {
    exitWithError('❌ MONGODB_URI is not defined in the environment variables');
  }

  try {
    // Compose the initialization steps using Ramda's pipeWith for async functions
    await R.pipeWith(R.andThen, [
      connectToMongoDB,
      () => createApolloServer({ typeDefs, resolvers }),
      startApolloServer,
    ])(MONGODB_URI as string);
  } catch (error) {
    console.error('❌ Error starting the server:', error);
  }
};

startServer();
