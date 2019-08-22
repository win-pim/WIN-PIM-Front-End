import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';
import {MessageService} from '../services/message.service';
import {UserService} from '../services/user.service';
import { Channel } from '../models/channel';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  @Input() channel: number;
  message: Message;

  constructor(private userService: UserService, private messageService: MessageService) {
    this.message = new Message('', this.userService.loggedInUser, this.channel)
  }

  onSubmit() {
    this.message.channel = this.channel;
    this.messageService.postMessage(this.message);
    this.message.body = '';
    this.messageService.updateMessages(this.channel);
  }
}
