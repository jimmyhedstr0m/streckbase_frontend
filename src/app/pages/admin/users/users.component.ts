import { Component, OnInit, OnDestroy } from "@angular/core";
import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { UsersService } from "./users.service";
import { User } from "./../../../types/user";

@Component({
  selector: "app-admin-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit, OnDestroy {
  public lobare: User[];
  public xlobare: User[];
  public faUser: IconDefinition = faUser;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe((users: User[]) => {
        this.lobare = users.filter((user: User) => user.lobare);
        this.xlobare = users.filter((user: User) => !user.lobare).reverse();
      });
  }

  ngOnDestroy() {

  }

}
