import { User } from './user';
import { Message } from './message';

export class Channel {
  name: string;
  description: string;
  owner: User;
  messages: Message[];
  id: number;
}
