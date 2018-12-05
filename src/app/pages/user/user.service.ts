import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "./../../../environments/environment";
import { User } from "./../../types/user";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}/purchases?limit=10`);
  }
}