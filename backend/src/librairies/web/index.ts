import fastify from 'fastify';
import { config } from 'dotenv';
import { authRoutes } from './routes/AuthRoutes';

config();

const server = fastify({ logger: true });
server.register(authRoutes);

server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async (db: () => void) => {
  try {
    db();
    await server.listen({ port: Number(process.env.FASTIFY_PORT), host: '0.0.0.0' });
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    if (port) {
      console.log(`Server listening on ${port}`);
    } else {
      console.log('Server is listening, but the address is unavailable.');
    }
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

export default start;
