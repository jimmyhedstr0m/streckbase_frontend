import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "./../../../types/user";
import { UsersService } from "./../users/users.service";

@Component({
  selector: "app-admin-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loading: boolean = false;
  public loginForm = new FormGroup({
    id: new FormControl("", [Validators.required, Validators.pattern(/\d{10}/)]),
  });

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    if (this.usersService.canActivate()) {
      this.router.navigate(["/admin"]);
    }
  }

  submit() {
    if (!this.loading && this.loginForm.valid) {
      const id: string = this.loginForm.value.id;
      this.loading = true;
      this.usersService.getUser(id)
        .subscribe((user: User) => {
          if (!user.admin) {
            console.log("User doesn't have admin access");
          } else {
            this.usersService.setLoggedInUser(user);
            this.router.navigate(["/admin"]);
          }
          this.loading = false;
        }, () => {
          console.log("Unable to find user");
          this.loading = false;
        });
    }
  }
}
