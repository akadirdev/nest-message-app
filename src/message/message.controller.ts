import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { IMessage } from './message.interface';

@Controller('/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':userId/with/:friendId')
  getMessages(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ): IMessage[] {
    return this.messageService.getMessages(userId, friendId);
  }
}
