import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {WebsocketService} from './websocket.service';
import {map} from 'rxjs/operators';
import {User} from './user';
import {Message} from './message';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Stomp.Client;

  public izz: User;

  constructor() {
    let s = new WebSocket('ws://localhost:8080/ws');
    this.messages = Stomp.over(s);
    this.messages.connect({}, frame => {
      this.messages.subscribe('/message', console.log);
    });
  }
}
