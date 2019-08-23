import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../services/message.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService} from '../services/user.service';

export interface DialogData {
  channel: string;
  description: string;
}

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, OnDestroy {

  constructor(private messageService: MessageService, public userService: UserService, public dialog: MatDialog) {}
  toggle = true;
  channel: string;
  description: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px',
      height: '400px',
      data: {channel: this.channel, description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.channel = result.channel;
      this.description = result.description;
    });
  }
  ngOnInit(): void {
    this.messageService.getMessages();
    this.messageService.connect();
  }

  changeChannel(channel): void {
    this.messageService.currentChannel = channel;
    this.messageService.getMessages();
    this.messageService.disconnect();
  }

  ngOnDestroy(): void {
    this.messageService.disconnect();
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
