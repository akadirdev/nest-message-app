export interface IUser {
  id?: string;
  username: string;
  color: string;
  friends: IUser[];
}
