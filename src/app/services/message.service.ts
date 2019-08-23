import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../models/channel';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public http: HttpClient, private rxStompService: RxStompService) { }

  public updateMessages(channel: Channel) {
    this.http.get<Message[]>(`${environment.httpUrl}/messages?channel=${channel.id}`).subscribe(res => {
        channel.messages = res
      });
    return channel;
  }

  public postMessage(message: Message) {
    this.http.post<Message>(`${environment.httpUrl}/messages`, message.toJson()).subscribe()
  }

  public subscribe(channel: Channel): Subscription {
    return this.rxStompService.watch(`${environment.httpUrl}/messages`).subscribe(res => {
      let message: Message | number = JSON.parse(res.body);
      console.log(message);
      if(message instanceof Message) {
        if (message.channel.id != channel.id) return;
        let i = channel.messages.findIndex(m => m.id == (message as Message).id);
        if (i == -1)
          channel.messages.push(message);
        else
          channel.messages[i] = message;
      } else {
        channel.messages = channel.messages.filter(m => m.id != message);
      }
    });
  }
}
