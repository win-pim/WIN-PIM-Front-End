import { Injectable } from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import * as io from 'socket.io-client';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // private socket;
  private url;

  constructor() {
    this.url = environment.testSocketIO + 'ws/message';
  }

  private subject: Subject<MessageEvent>;

  public connect(): Subject<MessageEvent> {

    if (!this.subject) {
          this.subject = this.create(this.url);
          console.log('Successfully connected: ' + this.url);
        }

    return this.subject;
    // // this.socket = environment.testSocketIO + 'ws/message';
    //     //
    //     // // tslint:disable-next-line:no-shadowed-variable
    //     // const observable = new Observable(observer => {
    //     //   this.socket.on('message', (data) => {
    //     //     console.log('Received message from Websocket Server');
    //     //     observer.next(data);
    //     // });
    //     //   return () => {
    //     //     this.socket.disconnect();
    //     // };
  // });

    // const observer = {
    //   // tslint:disable-next-line:ban-types
    //   next: (data: Object) => {
    //     this.socket.emit('message', JSON.stringify(data));
    //   }
    // };
    //
    // return Subject.create(observer, observable);
  }

  private create(url): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    const observer = {
      // tslint:disable-next-line:ban-types
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
