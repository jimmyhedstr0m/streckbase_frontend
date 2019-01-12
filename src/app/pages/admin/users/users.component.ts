import { Component, OnInit } from "@angular/core";
import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { UsersService } from "./users.service";
import { User } from "./../../../types/user";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-admin-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  public lobare: User[];
  public xlobare: User[];
  public faUser: IconDefinition = faUser;
  public showNewModal: boolean = false;
  public loading: boolean = false;
  public userForm = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    id: new FormControl(""),
    email: new FormControl(""),
    lobare: new FormControl(true)
  });

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.usersService.getUsers()
      .subscribe((users: User[]) => {
        this.lobare = users.filter((user: User) => user.lobare);
        this.xlobare = users.filter((user: User) => !user.lobare).reverse();
      });
  }

  toggleNewModal() {
    if (this.showNewModal) {
      this.userForm.reset();
    }

    this.showNewModal = !this.showNewModal;
  }

  submit() {
    if (this.userForm.valid && !this.loading) {
      this.loading = true;
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

      this.usersService.createUser(user)
        .subscribe(() => {
          this.getUsers();
          this.userForm.reset();
          this.showNewModal = false;
          this.loading = false;
        }, () => {
          console.log("Some error occured creating user");
          this.showNewModal = false;
          this.loading = false;
        });
    }
  }

}
