import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { throwError } from "rxjs/internal/observable/throwError";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { appConfig } from "./../../app.config";
import { ItemService } from "./../item/item.service";
import { UserService } from "./user.service";

import { Item } from "./../../types/item";
import { User } from "./../../types/user";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  private routeSubscription: Subscription;
  private timer: any;
  public user: User;
  public faChevronLeft = faChevronLeft;
  public faHome = faHome;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.setTimer();

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
    this.clearTimer();
    this.routeSubscription.unsubscribe();
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private setTimer() {
    this.timer = setTimeout(() => this.router.navigateByUrl("/"), appConfig.defaultTime);
  }

  buy(barcode: string) {
    this.clearTimer();
    this.setTimer();

    this.itemService.getBarcodeItem(barcode)
      .pipe(
        switchMap((item: Item) => {
          if (!item) return throwError("No matching item");

          return this.userService.purchaseItem(this.user.id, item);
        }),
        switchMap(() => this.userService.getUser(this.user.id))
      )
      .subscribe(
        (user: User) => {

          this.user = user;
        },
        (err: any) => {
          // what to do here?
          console.log("error", err);
        }
      )
  }

}