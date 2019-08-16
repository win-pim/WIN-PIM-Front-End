import { Component, OnInit } from '@angular/core';
import {Message} from '../message';
import {User} from '../user';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  showFiller = false;
  message: Message;
  messages: Message[];
  user1: User;
  toggle: boolean;



  constructor(private chatService: ChatService) {
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
