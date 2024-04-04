import fastify from 'fastify';
import { config } from "dotenv"
import { initializeDbConnection } from './infrastructure/db';

config()

const server = fastify({ logger: true });

server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  await initializeDbConnection();
  try {
    await server.listen({ port: 3000 });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
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

start();