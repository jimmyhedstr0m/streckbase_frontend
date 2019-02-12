import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { UsersService } from "./users.service";
import { User } from "./../../../types/user";

@Component({
  selector: "app-admin-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  private currentUser: User;
  public lobare: User[];
  public xlobare: User[];
  public faUser: IconDefinition = faUser;
  public isNewUser: boolean = true;
  public showUserModal: boolean = false;
  public loading: boolean = false;
  public modalTitle: string;
  public userForm = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    id: new FormControl("", Validators.pattern(/\d{10}/)),
    email: new FormControl("", Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)),
    lobare: new FormControl(true),
    admin: new FormControl(false),
    debt: new FormControl({value: 0, disabled: true}, Validators.pattern(/\d+/))
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

  toggleUserModal() {
    if (this.showUserModal) {
      this.userForm.reset();
      this.currentUser = null;
    } else {
      this.userForm.get("debt").disable();
      this.userForm.get("firstname").enable();
      this.userForm.get("lastname").enable();
      this.userForm.get("id").enable();
    }

    this.showUserModal = !this.showUserModal;
    this.isNewUser = this.showUserModal;
  }

  edit(user: User) {
    this.isNewUser = false;
    this.currentUser = user;
    this.userForm.setValue({
      firstname: user.firstname,
      lastname: user.lastname,
      id: user.id,
      email: user.email,
      lobare: user.lobare,
      admin: user.admin,
      debt: user.debt
    });
    
    this.userForm.get("debt").enable();
    this.userForm.get("firstname").disable();
    this.userForm.get("lastname").disable();
    this.userForm.get("id").disable();
    this.showUserModal = true;
  }

  submit() {
    if (this.userForm.valid && this.userForm.dirty && !this.loading) {
      this.loading = true;
      const user: User = {
        ...this.currentUser,
        ...this.userForm.value,
        debt: this.userForm.value.debt ? parseInt(this.userForm.value.debt, 10) : null,
        lobare: !!this.userForm.value.lobare
      };

      this.usersService.updateUser(user, this.isNewUser)
        .subscribe(() => {
          this.getUsers();
          this.userForm.reset();
          this.showUserModal = false;
          this.loading = false;
        }, () => {
          console.log("Some error occured when handling user");
          this.showUserModal = false;
          this.loading = false;
        });
    } else {
      this.showUserModal = false;
    }
  }

}
