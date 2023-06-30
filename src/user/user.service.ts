import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import { users } from './user.data';
import { v4 } from 'uuid';
import randomColor = require('randomcolor');

@Injectable()
export class UserService {
  createUserIfNotExist(username: string): IUser {
    const user = users[username];
    if (user) return user;

    const newUser = this.createUser(username);
    return newUser;
  }

  createUser(username: string): IUser {
    const id = v4();
    const color = randomColor();

    const newUser: IUser = {
      id,
      username,
      color,
      friends: [],
    };

    users[username] = newUser;
    return newUser;
  }

  addFriend(username: string, friendUsername: string): IUser {
    const user = { ...users[username] };
    if (!user.id) {
      throw new HttpException(
        `User:${username} Not Found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const friend = { ...users[friendUsername] };
    if (!friend.id) {
      throw new HttpException(
        `User:${friendUsername} Not Found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isAlreadyExistFriendForUser = user.friends.find(
      (friend) => friend.username === friendUsername,
    );
    if (isAlreadyExistFriendForUser) {
      throw new HttpException(
        `Friend:${friendUsername} Already Exist In User:${username} Friends`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isAlreadyExistFriendForFriend = friend.friends.find(
      (friend) => friend.username === username,
    );
    if (isAlreadyExistFriendForFriend) {
      throw new HttpException(
        `Friend:${username} Already Exist In User:${friendUsername} Friends`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const copyUser = { ...user };
    delete copyUser.friends;
    const copyFriend = { ...friend };
    delete copyFriend.friends;

    user.friends.push(copyFriend);
    friend.friends.push(copyUser);

    users[username] = user;
    users[friendUsername] = friend;

    return copyFriend;
  }
}
