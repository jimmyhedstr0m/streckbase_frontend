import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { switchMap } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";

import { ItemService } from "./item.service";
import { Item } from "../../types/item";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  public item: Item;
  // public showModal: boolean = false;

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit() {
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
          this.item = item;
        },
        (err: any) => {
          console.log("Error", err);
        }
      );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  // openModal() {
  //   this.showModal = true;
  // }

}