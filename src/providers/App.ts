import * as express from 'express';
import { createServer } from 'http2';
import Locals from './Locals';
import Database from './Database';
import ExpressServer from './ExpressServer';
import SocketServer from './SocketServer';
import logger from '@/utils/logger';

const app = express();
const server = createServer(app);

export default class App {
  static async loadConfiguration() {
    await import('./Locals');
    logger.info(`Configuration loaded, ${process.env.NODE_ENV}`);
  }

  static async loadDatabase() {
    await Database.init();
    logger.info(`Database loaded, Connection Uri: ${Locals.dbConnectionUri}`);
  }

  static async loadServer(): Promise<void> {
    return new Promise((resolve) => {
      ExpressServer.init(app);
      SocketServer.init(server);

      server.listen(Locals.port, () => {
        resolve();
        logger.info(`Server loaded, Listening on ${Locals.port}`);
      });
    });
  }
}
