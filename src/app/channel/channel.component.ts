import {Component, Input} from '@angular/core';
import { MessageService } from '../services/message.service';
import { Channel } from '../models/channel';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  styles: ['.mat-menu-content{ padding-top: 0; padding-bottom: 0}']
})
export class ChannelComponent {
  // tslint:disable-next-line:variable-name
  private _channel: Channel;
  sub: Subscription;

  constructor(private messageService: MessageService, private userService: UserService) { }

  get channel() {
    return this._channel;
  }

  @Input()
  set channel(c) {
    this._channel = c;
    if (this._channel.id === undefined) { return; }
    if (this.sub) { this.sub.unsubscribe(); }
    this.sub = this.messageService.subscribe(this._channel);
    this.messageService.updateMessages(this._channel);
  }
}
