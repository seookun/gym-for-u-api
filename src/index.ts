import 'reflect-metadata';
import App from './providers/App';

(async () => {
  try {
    // Load Configuration
    await App.loadConfiguration();

    // Load Database
    await App.loadDatabase();

    // Load Express Server
    await App.loadExpress();

    console.log(`Listening on ${process.env.PORT}`);
  } catch (e) {
    console.log(e);
    process.exit();
  }
})();
