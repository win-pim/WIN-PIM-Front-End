import { User } from './user';
import { Channel } from './channel';
import { Reaction } from './reaction';

export class Message {
  createdAt: any;
  reactions: Reaction[];
  id: number;

  constructor(public body: string, public author: User, public channel: Channel) { }

  toJson(): object {
    return {
      body: this.body,
      author: this.author.id,
      channel: this.channel.id
    }
  }
}
