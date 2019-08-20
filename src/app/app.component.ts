import {Component, OnInit} from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  loggedInUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.userService.loggedInUser;
  }
}
