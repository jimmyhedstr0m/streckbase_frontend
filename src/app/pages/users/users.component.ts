import { Component, OnInit } from "@angular/core";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { UsersService } from "./users.service";

import { User } from "./../../types/user";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  public lobare: User[];
  public xlobare: User[];
  public faChevronLeft = faChevronLeft;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe((users: User[]) => {
        this.lobare = users.filter((user: User) => user.lobare);
        this.xlobare = users.filter((user: User) => !user.lobare).reverse();
      });
  }

}