import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
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
import { Purchase } from "./../../types/purchase";
import { User } from "./../../types/user";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  private routeSubscription: Subscription;
  private timer: any;
  private debtTreshold: number = 2000;
  private undoTreshold: number = 864000000; // 1 day in ms;
  public user: User;
  public kindMessage: string;
  public errorMessage: string;
  public showDebtWarning: boolean = false;
  public showError: boolean = false;
  public showUndoConfirmation: boolean = false;
  public dateValid: boolean = false;
  public purchaseItem: Purchase;
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
        this.showDebtWarning = this.user.debt >= this.debtTreshold;
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
    this.purchaseItem = null;
    this.dateValid = false;

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
        (_err: HttpErrorResponse) => {
          this.kindMessage = "Köpet kunde inte genomföras för att artikeln inte finns i systemet";
          this.showError = true;
        }
      )
  }

  selectPurchase(purchase: Purchase) {
    this.purchaseItem = purchase;
    this.dateValid = new Date().getTime() - new Date(purchase.date).getTime() <= this.undoTreshold;
  }

  undoClick() {
    this.showUndoConfirmation = true;
  }

  undoPurchase() {
    this.userService.deletePurchase(this.user.id, this.purchaseItem.id)
      .pipe(
        switchMap(() => {
          return this.userService.getUser(this.user.id);
        })
      )
      .subscribe(
        (user: User) => {
          this.user = user;
        },
        (err: HttpErrorResponse) => {
          this.kindMessage = "Köpet kunde inte ångras";
          this.errorMessage = err.message;
          this.showError = true;
        });

    this.dateValid = false;
    this.purchaseItem = null;
    this.showUndoConfirmation = false;
  }

}