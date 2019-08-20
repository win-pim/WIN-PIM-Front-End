import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, OnDestroy {

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getMessages();
    this.messageService.connect();
  }

  changeChannel(channel): void {
    this.messageService.currentChannel = channel;
    this.messageService.getMessages();
    this.messageService.disconnect();
  }

  ngOnDestroy(): void {
    this.messageService.disconnect();
  }
}
