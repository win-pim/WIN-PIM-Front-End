import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public ws: Stomp.Client;

  constructor() {
    const socket = new WebSocket('ws://localhost:8080/ws');
    this.ws = Stomp.over(socket);
    this.ws.connect({}, frame => {
      this.ws.subscribe('/message', console.log);
    });
  }
}
