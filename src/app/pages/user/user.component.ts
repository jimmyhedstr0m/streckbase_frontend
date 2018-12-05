import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { UserService } from "./user.service";

import { User } from "./../../types/user";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  private routeSubscription: Subscription;
  public user: User;
  public faChevronLeft = faChevronLeft;
  public faHome = faHome;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.userService.getUser(params.id);
        })
      )
      .subscribe((user: User) => {
        console.log(user);
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}