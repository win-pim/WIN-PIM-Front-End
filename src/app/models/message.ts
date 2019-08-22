import {User} from './user';
import {Channel} from './channel';
import {Reaction} from './reaction';

export class Message {
  body: string;
  createdAt: any;
  author: User;
  channel: Channel;
  reactions: Reaction[];
}
