import { Component, OnInit, OnDestroy } from "@angular/core";
import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { UsersService } from "./users.service";
import { User } from "./../../../types/user";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-admin-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit, OnDestroy {
  public lobare: User[];
  public xlobare: User[];
  public faUser: IconDefinition = faUser;
  public showNewModal: boolean = true;
  public checked = true;
  public userForm = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    id: new FormControl(""),
    email: new FormControl(""),
    lobare: new FormControl(true)
  });

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

  onNewClick() {
    this.showNewModal = true;
  }

  submit() {
    const {
      email,
      firstname,
      id,
      lastname,
      lobare,
    } = this.userForm.value;

    const user: User = {
      id,
      firstname,
      lastname,
      email,
      lobare,
      debt: 0
    }

    this.usersService.createUser(user);
  }

}
