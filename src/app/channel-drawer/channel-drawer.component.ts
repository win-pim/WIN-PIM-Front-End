import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Channel } from '../models/channel';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-channel-drawer',
  templateUrl: './channel-drawer.component.html',
  styleUrls: ['./channel-drawer.component.css']
})
export class ChannelDrawerComponent implements OnInit {
  channels: Channel[];
  active: Channel;
  newChannel: Channel = new Channel();
  toggle: boolean;

  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '400px',
      data: {name: this.newChannel.name, description: this.newChannel.description}
    });

    dialogRef.afterClosed().subscribe((result: Channel) => {
      this.channelService.newChannel(result);
    });
  }

  ngOnInit(): void {
    this.channels = this.channelService.initChannels();
    setTimeout(() => this.active = this.channels[0], 1000);
  }

  changeChannel(channel: Channel): void {
    this.active = channel;
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

class DialogData {
  name: string;
  description: string;
}
