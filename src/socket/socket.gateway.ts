import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IMessageObject } from 'src/message/message.interface';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  handleDisconnect(client: Socket) {
    console.log('disconnection: ', client.id);
  }

  handleConnection(client: Socket) {
    console.log('new connection: ', client.id);
  }

  @SubscribeMessage('new-message')
  async newMessage(@MessageBody() messageObject: IMessageObject) {
    try {
      console.log('new message received: ', messageObject);
      this.messageService.saveMessage(messageObject);
      await this.server.emit('new-message-ack', {
        receiverUserId: messageObject.receiverUserId,
        senderUserId: messageObject.senderUserId,
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}
