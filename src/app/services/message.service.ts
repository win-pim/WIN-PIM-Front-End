import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../models/channel';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { RxStompState } from '@stomp/rx-stomp';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient, private rxStompService: RxStompService) {
    rxStompService.connectionState$.subscribe((state) => {
      // state is an Enum (Integer), RxStompState[state] is the corresponding string
      console.log(RxStompState[state]);
    });

  }

  public updateMessages(channel: Channel): Channel {
    this.http.get<Message[]>(`${environment.httpUrl}/messages?channel=${channel.id}`).subscribe(res => {
      channel.messages = res;
    });
    return channel;
  }

  public postMessage(message: Message) {
    this.http.post<Message>(`${environment.httpUrl}/messages`, message.toJson()).subscribe();
  }

  public subscribe(channel: Channel): Subscription {
    return this.rxStompService.watch('/messages').subscribe(res => {
      // If the message is new or was edited, we get it as a Message.
      // If the message was deleted, we just get its id as a number.
      let message: Message | number = JSON.parse(res.body);
      if(typeof message == 'number') {
        channel.messages = channel.messages.filter(m => m.id != message);
      } else {
        console.log(message);
        if (message.channel.id != channel.id) return;
        let i = channel.messages.findIndex(m => m.id == (message as Message).id);
        if (i == -1) channel.messages.push(message);
        else channel.messages[i] = message;
      }
    });
  }
}
