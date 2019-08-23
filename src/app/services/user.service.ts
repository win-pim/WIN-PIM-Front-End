import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: User;

  constructor(private http: HttpClient) {
    this.loggedInUser = new User();
  }

  public sign(user: User, type: string) {
    this.http.post<User>(`${environment.httpUrl}/user/auth/${type}`, user)
      .subscribe(response => this.loggedInUser = response);
  }

  public logout() {
    this.loggedInUser = new User();
  }
}


