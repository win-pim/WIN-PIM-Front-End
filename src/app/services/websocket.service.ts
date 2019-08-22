import { Injectable } from '@angular/core';
import { Channel } from '../models/channel';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {
  }
  public channelList: Channel[] = [];
  public messages: Message[] = [];

}
