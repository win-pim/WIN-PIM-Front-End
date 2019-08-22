import {User} from './user';
import {Channel} from './channel';
import {Reaction} from './reaction';

export class Message {
  createdAt: any;
  reactions: Reaction[];
  id: number;

  constructor(public body: string, public author: User, channel: Channel) {

  }

  public get channel() {

  }
}
