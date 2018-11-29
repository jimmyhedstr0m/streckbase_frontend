import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AddService } from "./add.service";
import { Subscription } from "rxjs/internal/Subscription";

import { ImageService } from "./../../core/image.service";
import { SystembolagetItem } from "./systembolaget-item";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"]
})
export class AddComponent implements OnInit, OnDestroy {
  @ViewChild("queryForm") queryForm: NgForm;
  private systembolagetSubscription: Subscription;
  public query: string = "1491";
  public item: SystembolagetItem;
  public itemImage: string;

  constructor(private addService: AddService, private imageService: ImageService) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.systembolagetSubscription) {
      this.systembolagetSubscription.unsubscribe();
    }
  }

  onSearch() {
    if (this.queryForm.valid) {
      this.systembolagetSubscription = this.addService.getSystembolagetMetadata(this.query)
        .subscribe((item: SystembolagetItem) => {
          console.log("item", item);
          this.item = item;

          if (item.imageUrl) {
            this.imageService.convertImage(item.imageUrl)
              .then((image: string) => this.itemImage = image)
              .catch(e => console.log(e));
          }
        });
    }
  }

}