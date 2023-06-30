import { Controller, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':username')
  createUser(@Param('username') username: string): IUser {
    return this.userService.createUserIfNotExist(username);
  }

  @Post('friends/new')
  addFriend(
    @Query('username') username: string,
    @Query('friend') friend: string,
  ): IUser {
    return this.userService.addFriend(username, friend);
  }
}
