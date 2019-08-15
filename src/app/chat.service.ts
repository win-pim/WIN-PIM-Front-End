import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';
import {map} from 'rxjs/operators';
import {User} from './user';
import {Message} from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message>;

  public izz: User = new User();

  constructor(wsService: WebsocketService) {


    this.messages = wsService
      .connect()
      .pipe(map(
      (response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        console.log(response);
        return {
          channel: data.channel,
          createdAt: data.createdAt,
          reactions: data.reactions,
          author: data.author,
          body: data.body
        };
      })) as Subject<any>;
  }
}
