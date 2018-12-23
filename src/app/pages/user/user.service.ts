import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "./../../../environments/environment";
import { Item } from "./../../types/item";
import { User } from "./../../types/user";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}/purchases?limit=20`);
  }

  purchaseItem(userId: string, item: Item): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/${userId}/purchases`, item);
  }
}