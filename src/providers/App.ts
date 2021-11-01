import Database from './Database';
import Express from './Express';
import Locals from './Locals';
import logger from '@/utils/logger';

export default class App {
  static async loadConfiguration() {
    await import('./Locals');
    logger.info(`Configuration loaded, ${process.env.NODE_ENV}`);
  }

  static async loadDatabase() {
    await Database.init();
    logger.info(`Database loaded, Connection Uri: ${Locals.mongoConnectionUri}`);
  }

  static async loadExpress() {
    await Express.init();
    logger.info(`Express loaded, Listening on ${Locals.port}`);
  }
}
