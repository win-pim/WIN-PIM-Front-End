import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl: string;
  constructor(private http: HttpClient) {
    // this.usersUrl = 'http://localhost:8080/auth';
  }

  public makeNew() {
    this.http.post<User>("http://localhost:8080/auth", JSON.stringify(new User("user", "pass")))
      // .subscribe(console.log)
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
}


