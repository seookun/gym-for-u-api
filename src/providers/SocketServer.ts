/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-var-requires */
import * as path from 'path';
import { Server } from 'http';
import { SocketControllersOptions, useSocketServer } from 'socket-controllers';
import { verifyAccessToken } from '@/utils/jwt';

function authorizationChecker(socket: any, next: Function) {
  try {
    const accessToken = socket.handshake.headers.authorization?.replace('Bearer', '').trim();
    verifyAccessToken(accessToken);
    next();
  } catch (err) {
    // next(err);
    next();
  }
}

export default class Socket {
  static init(server: Server) {
    const io = require('socket.io')(server, {
      cors: { origin: '*' },
    });
    const options: SocketControllersOptions = {
      controllers: [path.join(__dirname, '../socket-controllers/*.{js,ts}')],
    };

    io.use(authorizationChecker);
    useSocketServer(io, options);
  }
}
