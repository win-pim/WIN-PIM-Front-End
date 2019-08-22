import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../models/channel';
import { RxStompService } from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public http: HttpClient, private rxStompService: RxStompService) {
  }

  public url = environment.httpUrl;

  public updateMessages(channel: Channel) {
    this.http.get<Message[]>(`${this.url}/messages?channel=${channel.id}`)
      .subscribe(res => {
        console.log(res);
        channel.messages = res
      });
    return channel;
  }

  public postMessage(message: Message) {
    console.log(JSON.stringify(message));
    this.http.post<Message>(`${this.url}/messages`, message).subscribe(() => {
      this.updateMessages(message.channel)
    });
  }
}
