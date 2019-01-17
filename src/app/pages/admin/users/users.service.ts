import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "./../../../../environments/environment";
import { User } from "./../../../types/user";

@Injectable()
export class UsersService implements CanActivate {
  private storageKey: string = "admin";
  private currentUser: User;

  constructor(private http: HttpClient, private router: Router) { }

  canActivate(): boolean {
    const user: User = JSON.parse(sessionStorage.getItem(this.storageKey));
    if (!user || (this.currentUser && this.currentUser.id !== user.id)) {
      this.router.navigate(["/admin/login"]);
      return false;
    }

    return true;
  }

  setLoggedInUser(user: User) {
    this.currentUser = user;
    sessionStorage.setItem(this.storageKey, JSON.stringify(user));    
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}`);
  }

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