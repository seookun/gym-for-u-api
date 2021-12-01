import 'reflect-metadata';
import App from '@/providers/App';
import logger from '@/utils/logger';

(async () => {
  // Load Configuration
  await App.loadConfiguration();

  // Load Database
  await App.loadDatabase();

  // Load Express Server
  await App.loadExpress();
})();
