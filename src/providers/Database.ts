import { connect } from 'mongoose';
import Locals from './Locals';

export default class Database {
  static async init() {
    await connect(Locals.dbConnectionUri);
  }
}
