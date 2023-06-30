export interface IMessage {
  id?: string;
  message: string;
  senderUserId: string;
  date: Date;
}

export interface IMessageObject extends IMessage {
  receiverUserId: string;
}
