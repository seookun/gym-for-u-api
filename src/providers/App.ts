import Database from './Database';
import Express from './Express';
import logger from '@/utils/logger';

export default class App {
  public static async loadConfiguration() {
    await import('./Locals');
    logger.info(`Configuration loaded`);
  }

  public static async loadDatabase() {
    await Database.init();
    logger.info(`Database loaded, Connection Uri: ${process.env.MONGODB_CONNECTION_URI}`);
  }

  public static async loadExpress() {
    await Express.init();
    logger.info(`Express loaded, Listening on ${process.env.PORT}`);
  }
}
