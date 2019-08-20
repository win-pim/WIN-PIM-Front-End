import {Component, OnDestroy, OnInit} from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';
import {MessageService} from '../services/message.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})

export class MessageInputComponent {
  message: Message;

  constructor(private userService: UserService, private messageService: MessageService) {
    this.message = new Message();
  }

  newMessageTemplate(): Message {
    const newMsg = new Message();
    newMsg.channel = this.messageService.currentChannel;
    newMsg.author = this.userService.loggedInUser;
    return newMsg;
  }

  onSubmit() {
    this.message.channel = this.messageService.currentChannel;
    this.message.author = this.userService.loggedInUser;
    this.messageService.postMessage(this.message);
    this.message = new Message();
  }
}
