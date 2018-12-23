import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { switchMap } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import { faChevronLeft, faCocktail } from "@fortawesome/free-solid-svg-icons";

import { appConfig } from "./../../app.config";
import { environment } from "./../../../environments/environment";
import { ItemService } from "./item.service";
import { Item } from "../../types/item";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  public faChevronLeft = faChevronLeft;
  public faCocktail = faCocktail;
  private timer: any;
  public item: Item;
  public showErrorModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.setTimer();

    this.routeSubscription = this.route.params
      .pipe(
        switchMap((params: any) => {

          if (params.hasOwnProperty("id")) {
            return this.itemService.getItem(parseInt(params.id, 10));
          } else if (params.hasOwnProperty("barcode")) {
            return this.itemService.getBarcodeItem(params.barcode);
          } else {
            throwError("Invalid parameters");
          }

        })
      )
      .subscribe(
        (item: Item) => {
          console.log("item", item);
          this.showErrorModal = false;
          this.item = item;
          // this.item.imageUrl = item.imageUrl ? environment.apiUrl + item.imageUrl : null;
        },
        (_err: any) => {
          this.showErrorModal = true;
        }
      );
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

  onValueChange(barcode: string) {
    if (this.item && this.item.barcodes.some((b: string) => b === barcode)) {
      this.router.navigateByUrl("/");
    } else {
      this.router.navigate(["/items/barcodes", barcode]);
    }

    this.item = null;
  }

  goBack() {
    this.showErrorModal = false;
    setTimeout(() => this.router.navigateByUrl("/"));
  }
}