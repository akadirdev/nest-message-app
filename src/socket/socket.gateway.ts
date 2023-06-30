import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IMessage } from 'src/message/message.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('new-message')
  async newMessage(@MessageBody() messageObject: IMessage): Promise<string> {
    console.log('new message received: ', messageObject);
    return 'new-id';
  }
}
