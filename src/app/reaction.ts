import {Message} from './message';
import {User} from './user';

export class Reaction {
  message: Message;
  emoji: symbol;
  users: User[];
  count: number;
}
