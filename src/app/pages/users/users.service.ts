import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";

import { environment } from "./../../../environments/environment";
import { User } from "./../../types/user";

@Injectable()
export class UsersService {
  private usersSubject = new ReplaySubject<User[]>(1);

  constructor(private http: HttpClient) { }

  private fetchUsers() {
    this.http.get<User[]>(`${environment.apiUrl}/users?limit=1000`)
      .subscribe((users: User[]) => this.usersSubject.next(users));
  }

  getUsers(): Observable<User[]> {
    this.fetchUsers();
    return this.usersSubject.asObservable();
  }
}