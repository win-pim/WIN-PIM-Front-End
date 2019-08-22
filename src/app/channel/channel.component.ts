import { Component, Input, OnInit } from '@angular/core';
import { Channel } from '../models/channel';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  @Input() channel: Channel;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    if(this.channel.id != undefined)
        this.messageService.updateMessages(this.channel);
  }
}

