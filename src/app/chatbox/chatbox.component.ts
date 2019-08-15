import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../websocket.service';
import {ChatService} from '../chat.service';
import {Message} from '../message';
import {User} from '../user';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  providers: [
    WebsocketService,
    ChatService
  ]
})

export class ChatboxComponent implements OnInit{

  message: Message;
  messages: Message[];
  user1: User;

  constructor(private chatService: ChatService) {
    this.user1 = new User();
    this.user1.name = 'IzzTheGreat';
    this.message = new Message();
    this.message.author = this.user1;
    this.messages = [];
  }

  ngOnInit(): void {
    this.chatService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg);
      this.messages.unshift(msg);
    });
  }

  onSubmit() {
    console.log('new message from client to websocket: ', this.message);
    this.chatService.messages.next(this.message);
    this.message = new Message();
    this.message.author = this.user1;
  }
}
