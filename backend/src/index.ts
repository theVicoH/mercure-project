import { initializeDbConnection } from './librairies/db/Sequalize';
import start from './librairies/web';

start(initializeDbConnection);
