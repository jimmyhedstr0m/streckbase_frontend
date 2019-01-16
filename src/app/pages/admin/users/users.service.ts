import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "./../../../../environments/environment";
import { User } from "./../../../types/user";

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users?limit=1000`);
  }

  updateUser(user: User, isNew: boolean): Observable<User> {
    if (isNew) {
      return this.http.post<User>(`${environment.apiUrl}/users`, user);
    } else {
      console.log('putte', user);
      return this.http.put<User>(`${environment.apiUrl}/users`, user);
    }
  }
}