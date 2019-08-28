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
  newChannel: Channel;
  toggle: boolean;

  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open<DialogComponent, Channel, Channel>(DialogComponent, {
      width: '400px',
      height: '400px',
      data: this.newChannel
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newChannel = result;
    });
  }

  ngOnInit(): void {
    this.channels = this.channelService.channels;
  }

  changeChannel(channel: Channel): void {
    this.active = channel;
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Channel) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
