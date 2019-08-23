import { Component } from '@angular/core';
import { Channel } from '../models/channel';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  inputs: ['channel']
})
export class ChannelComponent {
  private _channel: Channel;
  sub: Subscription;

  constructor(private messageService: MessageService) { }

  get channel() {
    return this._channel;
  }

  set channel(c) {
    this._channel = c;
    if(this._channel.id == undefined) return;
    if(this.sub) this.sub.unsubscribe();
    this.sub = this.messageService.subscribe(this._channel);
    this.messageService.updateMessages(this._channel);
  }
}
