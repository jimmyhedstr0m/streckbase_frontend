import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { switchMap } from "rxjs/operators";

import { ProductService } from "./product.service";
import { Item } from "./../../types/item";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  public item: Item;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params
      .pipe(
        switchMap((params: any) => {
          console.log(params);
          return this.productService.getItem(parseInt(params.id, 10));
        })
      )
      .subscribe((item: Item) => {
        console.log("item", item);
        this.item = item;
      });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}