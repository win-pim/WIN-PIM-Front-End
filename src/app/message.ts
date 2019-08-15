import {User} from './user';
import {Channel} from './channel';
import {Reaction} from './reaction';

export class Message {
  body: string;
  createdAt;
  author: any;
  channel: any;
  reactions: any[];
}
