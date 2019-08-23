import { Component, OnInit } from '@angular/core';
import { Channel } from '../models/channel';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-channel-drawer',
  templateUrl: './channel-drawer.component.html',
  styleUrls: ['./channel-drawer.component.css']
})
export class ChannelDrawerComponent implements OnInit {
  channels: Channel[];
  active: Channel = new Channel();
  toggle: boolean;

  constructor(private channelService: ChannelService) { }

  ngOnInit() {
    this.channels = this.channelService.channels;
  }

  openDialog() {

  }

  changeChannel(channel: Channel) {
    this.active = channel;
  }
}
