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

  public messages: Subject<any>;

  public izz: User = new User();

  constructor(wsService: WebsocketService) {


    this.messages = wsService
      .connect()
      .pipe(map(
      (response: any): Message => {
        const data = JSON.parse(response.text);
        return {
          channel: undefined, createdAt: undefined, id: 0, reactions: [],
          author: data.author,
          body: data.body
        };
      })) as Subject<any>;
  }
}
