import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../websocket.service';
import {ChatService} from '../chat.service';
import {Message} from '../message';
import {User} from '../user';
import {Channel} from '../channel';
import {Reaction} from '../reaction';

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

  static messageTemplate() {
   const newMessage = new Message();
   newMessage.author = 1;
   newMessage.channel = 1;
   newMessage.reactions = [];
   return newMessage;
  }


  constructor(private chatService: ChatService) {
    this. message = ChatboxComponent.messageTemplate();
    this.messages = [];
    this.chatService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg);
      this.messages.unshift(msg);
    });
  }

  ngOnInit(): void {
    // this.chatService.messages.subscribe(msg => {
    //   console.log('Response from websocket: ' + msg);
    //   this.messages.unshift(msg);
    // });
  }

  onSubmit() {
    console.log('new message from client to websocket: ', this.message);
    this.chatService.messages.next(this.message);
    this.message = new Message();
    this.message.author = this.user1;
  }
}
