import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../websocket.service';
import {ChatService} from '../chat.service';
import {Message} from '../message';
import {User} from '../user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  providers: [
    WebsocketService,
    ChatService
  ]
})

export class ChatboxComponent implements OnInit {

  message: Message;
  messages: Message[];
  user1: User;

  constructor(private chatService: ChatService, private http: HttpClient) {
    this.messages = [];
  }

  ngOnInit(): void {
    // this.chatService.messages.subscribe(msg => {
    //   console.log('Response from websocket: ' + msg);
    //   this.messages.unshift(msg);
    // });
  }

  onSubmit() {
    console.log('new message from client to websocket: ', JSON.stringify(this.message));
    this.message = new Message();
    this.message.author = this.user1;

    // @ts-ignore
    this.chatService.messages.send('/ws/message', {}, JSON.stringify(
      this.message
    ));
  }
}
