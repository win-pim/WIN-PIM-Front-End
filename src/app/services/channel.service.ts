import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../models/channel';
import { environment } from '../../environments/environment';
import { RxStompService } from '@stomp/ng2-stompjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  channels: Channel[] = [];

  constructor(private http: HttpClient, private userService: UserService, rxStompService: RxStompService) {
    rxStompService.watch('/channels/new').subscribe(({ body }) => {
      this.channels.push(this.fromJson(body));
    });

    rxStompService.watch('/channels/deleted').subscribe(({ body }) => {
      let i = this.channels.findIndex(c => c.id == JSON.parse(body));
      this.channels.splice(i, 1);
    });
  }

  public initChannels(): Channel[] {
    this.http.get<Channel[]>(`${environment.httpUrl}/channels`).subscribe(res => {
      this.channels.length = 0;
      this.channels.push(...res.map(c => this.fromJson(c)));
    });
    return this.channels;
  }

  public newChannel(channel: Channel) {
    this.http.post<Channel>(`${environment.httpUrl}/channels`, channel).subscribe();
  }

  fromJson(json: object | string): Channel {
    if(typeof json == 'string') json = JSON.parse(json);
    let channel = new Channel();
    channel.id = json['id'];
    channel.name = json['name'];
    channel.description = json['description'];
    channel.owner = this.userService.fromJson(json['owner']);
    return channel;
  }
}
