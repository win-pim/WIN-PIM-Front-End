import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../models/channel';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { RxStompState } from '@stomp/rx-stomp';
import { UserService } from './user.service';
import { ChannelService } from './channel.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = `${environment.httpUrl}/messages`;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private channelService: ChannelService,
    private rxStompService: RxStompService
  ) {
    rxStompService.connectionState$.subscribe((state) => {
      // state is an Enum (Integer), RxStompState[state] is the corresponding string
      console.log(RxStompState[state]);
    });
  }

  public updateMessages(channel: Channel): Channel {
    this.http.get<Message[]>(`${this.url}?channel=${channel.id}`).subscribe(res => {
      channel.messages = res.map(m => this.fromJson(m));
    });
    return channel;
  }

  public postMessage(message: Message) {
    this.http.post<Message>(this.url, message.toJson()).subscribe();
  }

  public editMessage(message: Message) {
    this.http.patch<Message>(this.url, {
      id: message.id,
      body: message.body,
      author: message.author.id,
      channel: message.channel.id
    }).subscribe();
  }

  public deleteMessage(message: Message) {
    this.http.request<Message>('delete', this.url, { body: {
      id: message.id,
      body: message.body,
      author: message.author.id,
      channel: message.channel.id
    } }).subscribe();
  }

  public subscribe(channel: Channel): Subscription[] {
    console.log(`/messages/${channel.id}/new`);
    return [
      this.rxStompService.watch(`/messages/${channel.id}/new`).subscribe(({ body }) => {
        channel.messages.push(this.fromJson(body));
      }),
      this.rxStompService.watch(`/messages/${channel.id}/edited`).subscribe(({ body }) => {
        let message: Message = this.fromJson(body);
        console.log(message);
        let i = channel.messages.findIndex(m => m.id == message.id);
        if(i != -1) channel.messages[i] = message;
      }),
      this.rxStompService.watch(`/messages/${channel.id}/deleted`).subscribe(({ body }) => {
        let message: Message = this.fromJson(body);
        channel.messages = channel.messages.filter(m => m.id != message.id)
      })
    ];
    // return this.rxStompService.watch('/messages').subscribe(res => {
    //   // If the message is new or was edited, we get it as a Message.
    //   // If the message was deleted, we just get its id as a number.
    //   let message: Message | number = JSON.parse(res.body);
    //   if(typeof message == 'number') {
    //     channel.messages = channel.messages.filter(m => m.id != message);
    //   } else {
    //     console.log(message);
    //     if (message.channel.id != channel.id) return;
    //     let i = channel.messages.findIndex(m => m.id == (message as Message).id);
    //     if (i == -1) channel.messages.push(message);
    //     else channel.messages[i] = message;
    //   }
    // });
  }

  fromJson(json: object | string): Message {
    if(typeof json == 'string') json = JSON.parse(json);
    let message = new Message(
      json['body'],
      this.userService.fromJson(json['author']),
      this.channelService.fromJson(json['channel'])
    );
    message.id = json['id'];
    message.createdAt = json['createdAt'];
    message.reactions = json['reactions'];
    return message;
  }
}
