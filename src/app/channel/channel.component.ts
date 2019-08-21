import {Component, Inject, OnInit} from '@angular/core';
import {Message} from '../message';
import {User} from '../user';
import {ChatService} from '../chat.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  channel: string;
}

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channel: string;
  message: Message;
  messages: Message[];
  user1: User;
  toggle: boolean;



  constructor(private chatService: ChatService, public dialog: MatDialog) {
    this.messages = [];
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {channel: this.channel}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.channel = result;
    });
  }
  ngOnInit(): void {
    // this.chatService.messages.subscribe(msg => {
    //   console.log('Response from websocket: ' + msg);
    //   this.messages.unshift(msg);
    // });
  }

  onSubmit() {
    console.log('new message from client to websocket: ', JSON.stringify(this.message));
    this.message = new Message();
    this.message.author = this.user1;

    // @ts-ignore
    this.chatService.messages.send('/ws/message', {}, JSON.stringify(
      this.message
    ));
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
