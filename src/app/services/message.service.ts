import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../models/channel';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { RxStompState } from '@stomp/rx-stomp';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public http: HttpClient, private rxStompService: RxStompService) {
    this.getCurrentChannel();
  }

  public url = environment.httpUrl;
  public currentChannel: Channel  = {
    id: 1,
    name: 'TestName',
    description: 'TestDesc'
  };
  public channelList: Channel[] = [];
  public messages: Message[] = [];
  public messageSubscription: Subscription;




  public connect() {
    this.messageSubscription = this.rxStompService.watch('/message?channel=' + this.currentChannel.id, {})
      .subscribe((response) => {
        console.log(response);
        this.messages.push(JSON.parse(response.body));
      });
    this.rxStompService.connectionState$.subscribe((state) => {
      // state is an Enum (Integer), RxStompState[state] is the corresponding string
      console.log(RxStompState[state]);
    });
  }

  public disconnect() {
    this.messageSubscription.unsubscribe();
  }

  private getCurrentChannel = () => {
    this.getChannels();
    setTimeout (() => {
    if (this.channelList.length > 0) {
      this.currentChannel = this.channelList[0];
    }}, 1000
  );
  }

  public getChannels() {
    this.http.get<Channel[]>(this.url + '/channel')
      .subscribe(response => {
        this.channelList = response;
      });
  }

  public getMessages() {
    this.http.get<Message[]>(this.url + '/message?channel=' + this.currentChannel.id)
      .subscribe((response) => {
        this.messages = response;
      });
  }

  public postMessage(newMsg: Message) {
    this.rxStompService.publish({
      destination: environment.wsUrl + '/message?channel=' + this.currentChannel.id,
      body: JSON.stringify(newMsg)
    });
    this.http.post(this.url + '/message', newMsg).subscribe(console.log);
  }
}
