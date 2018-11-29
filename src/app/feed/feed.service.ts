import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from "./../../environments/environment";
import { User } from "./../types/user";

@Injectable()
export class FeedService {

  constructor(private http: HttpClient) { }

  getFeed(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users/purchases?limit=10`);
  }
}