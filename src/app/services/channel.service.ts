import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../models/channel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private _channels: Channel[] = [];

  constructor(private http: HttpClient) { }

  public get channels(): Channel[] {
    this.http.get<Channel[]>(`${environment.httpUrl}/channels`).subscribe(res => {
      this._channels.length = 0;
      this._channels.push(...res)
    });
    return this._channels;
  }
}
