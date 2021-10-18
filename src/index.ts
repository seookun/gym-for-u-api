import 'reflect-metadata';
import App from './providers/App';
import { logger } from './providers/Log';

(async () => {
  try {
    // Load Configuration
    await App.loadConfiguration();

    // Load Database
    await App.loadDatabase();

    // Load Express Server
    await App.loadExpress();
  } catch (e) {
    logger.error(e);
    process.exit();
  }
})();
