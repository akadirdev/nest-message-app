import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { SocketModule } from './socket/socket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MessageModule, SocketModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
