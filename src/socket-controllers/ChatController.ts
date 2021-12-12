import { SocketController, OnConnect, OnDisconnect, OnMessage, ConnectedSocket, MessageBody } from 'socket-controllers';
import logger from '@/utils/logger';

@SocketController()
export class ChatController {
  @OnConnect()
  connection(@ConnectedSocket() socket: any) {
    logger.http(`${socket.request.method} /socket.io connected ${socket.id} `);
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: any) {
    logger.http(`${socket.request.method} /socket.io disconnected ${socket.id} `);
  }

  @OnMessage('join_room')
  joinRoom(@ConnectedSocket() socket: any, @MessageBody() roomId: string) {
    socket.join(roomId);
  }
}
