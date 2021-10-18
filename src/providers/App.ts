import Database from './Database';
import Express from './Express';

export default class App {
  public static async loadConfiguration() {
    await import('./Locals');
  }

  public static async loadDatabase() {
    await Database.init();
  }

  public static async loadExpress() {
    await Express.init();
  }
}
