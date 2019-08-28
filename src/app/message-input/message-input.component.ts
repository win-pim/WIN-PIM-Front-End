import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { Channel } from '../models/channel';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})

export class MessageInputComponent implements OnInit {
  @Input() channel: Channel;
  message: Message;

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.message = new Message('', this.userService.loggedInUser, this.channel);
  }

  onSubmit() {
    this.message.channel = this.channel;
    this.messageService.postMessage(this.message);
    this.message.body = '';
  }
}
