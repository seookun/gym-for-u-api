import { connect } from 'mongoose';

export default class Database {
  public static async init() {
    await connect(process.env.MONGODB_CONNECTION_URI!);
  }
}
