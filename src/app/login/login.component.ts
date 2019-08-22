import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {
  hide = true;
  public submit;
  public user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
  }

  onSubmit() {
    this.userService.sign(this.user, this.submit);
  }

}
