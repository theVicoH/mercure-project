import { initializeDbConnection } from './librairies/db/Sequalize';
import start from './librairies/fastify';

start(initializeDbConnection);
