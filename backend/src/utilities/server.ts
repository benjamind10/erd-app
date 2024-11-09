import { ApolloServer, Config } from 'apollo-server';

/**
 * Creates an instance of ApolloServer with the provided options.
 * @param options - The Apollo Server configuration object.
 */
export const createApolloServer = (options: Config): ApolloServer => {
  return new ApolloServer(options);
};

/**
 * Starts the ApolloServer instance.
 * @param server - The ApolloServer instance to start.
 */
export const startApolloServer = async (server: ApolloServer): Promise<void> => {
  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
};

