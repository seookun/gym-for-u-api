import { connect } from 'mongoose';
import Locals from './Locals';

export default class Database {
  public static async init() {
    await connect(Locals.mongoConnectionUri);
  }
}
