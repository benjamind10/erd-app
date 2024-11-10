import { ApolloServer, Config } from 'apollo-server';
import { getUserFromAuthHeader } from './auth';

/**
 * Creates an instance of ApolloServer with the provided options,
 * adding a mock user to the context in development mode.
 * @param options - The Apollo Server configuration object.
 * @returns A configured ApolloServer instance.
 */
export const createApolloServer = (options: Config): ApolloServer => {
  const isDevelopment = process.env.NODE_ENV !== 'production';

  const server = new ApolloServer({
    ...options,
    context: ({ req }) => {
      if (isDevelopment) {
        // In development mode, add a mock user to the context
        return {
          user: { id: '672fd6b8be72f4bf89b5b08f' },
        };
      }

      const authHeader = req.headers.authorization || '';
      const user = getUserFromAuthHeader(authHeader);

      if (!user) {
        throw new Error('Authentication required');
      }

      return { user };
    },
  });

  return server;
};

/**
 * Starts the ApolloServer instance.
 * @param server - The ApolloServer instance to start.
 */
export const startApolloServer = async (
  server: ApolloServer
): Promise<void> => {
  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
};
