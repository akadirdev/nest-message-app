import { Injectable } from '@nestjs/common';
import { IMessage, IMessageObject } from './message.interface';
import { messages } from './message.data';
import { v4 } from 'uuid';

@Injectable()
export class MessageService {
  saveMessage(messageObject: IMessageObject): IMessage {
    const key = this.generateMessageChannelKey([
      messageObject.senderUserId,
      messageObject.receiverUserId,
    ]);
    const channelMessages = messages[key];

    const id = v4();
    const newMessage: IMessage = {
      id,
      date: messageObject.date,
      message: messageObject.message,
      senderUserId: messageObject.senderUserId,
    };

    if (channelMessages) channelMessages.push(newMessage);
    else messages[key] = [newMessage];

    return newMessage;
  }

  getMessages(userId: string, friendId: string): IMessage[] {
    const key = this.generateMessageChannelKey([userId, friendId]);

    return messages[key] ?? [];
  }

  generateMessageChannelKey(ids: string[]): string {
    return ids.sort().join('-');
  }
}
