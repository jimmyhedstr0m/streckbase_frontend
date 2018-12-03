import { Component, OnInit } from "@angular/core";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { UsersService } from "./users.service";

import { User } from "./../../types/user";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  public lobare: User[] = [];
  public xlob: User[] = [];
  public faChevronLeft = faChevronLeft;
  public faUser = faUser;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe((users: User[]) => {
        console.log(users);
        this.lobare = users.filter((user: User) => user.lobare);
        this.xlob = users.filter((user: User) => !user.lobare);
        console.log(this.xlob);
      });
  }

}