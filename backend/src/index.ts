import { initializeDbConnection } from './librairies/db/Sequalize';
import setupAssociations from './librairies/db/models/Associations';
import start from './librairies/fastify';

setupAssociations();
start(initializeDbConnection);
