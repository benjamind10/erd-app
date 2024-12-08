import server from './utilities/server';

const startServer = async () => {
  try {
    const { url } = await server.listen({ port: 4000, host: '0.0.0.0' });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('❌ Error starting the server:', error);
  }
};

startServer();

