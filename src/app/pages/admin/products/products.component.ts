import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { faPlus, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { ProductsService } from "./products.service";
import { Item } from "./../../../types/item";

const EAN_13: RegExp = /\d{13}/;

function ValidateBarcodes(c: AbstractControl) {
  if (c && c.value) {
    const array = c.value.split(",");
    const valid: boolean = array.every((value: string) => EAN_13.test(value) && value.trim().length === 13);

    if (!valid) {
      return {
        validateBarcodes: true
      }
    }
  }

  return null;
}

@Component({
  selector: "app-admin-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  private currentItem: Item;
  private allItems: Item[] = [];
  public items: Item[] = [];
  public faPlus: IconDefinition = faPlus;
  public query: string;
  public isNewItem: boolean = true;
  public showItemModal: boolean = false;
  public loading: boolean = false;
  public itemForm = new FormGroup({
    name: new FormControl(""),
    price: new FormControl(""),
    volume: new FormControl("", Validators.pattern(/\d+/)),
    alcohol: new FormControl(""),
    barcodes: new FormControl("", [Validators.required, ValidateBarcodes]),
    imageUrl: new FormControl("")
  });

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getItems();
  }

  private getItems() {
    this.productsService.getItems()
      .subscribe((items: Item[]) => {
        this.allItems = items;
        this.items = items;
      });
  }

  filter() {
    const keys = ["id", "name", "price"];

    this.items = this.allItems
      .filter((item: Item) => keys
        .some((key: string) => item[key].toString().toLowerCase().indexOf(this.query) > -1));
  }

  toggleItemModal() {
    if (this.showItemModal) {
      this.itemForm.reset();
      this.currentItem = null;
    }

    this.showItemModal = !this.showItemModal;
    this.isNewItem = this.showItemModal;
  }

  edit(item: Item) {
    this.isNewItem = false;
    this.currentItem = item;
    this.itemForm.setValue({
      name: item.name,
      price: item.price,
      alcohol: item.alcohol,
      barcodes: item.barcodes.join(", "),
      volume: item.volume,
      imageUrl: item.imageUrl
    });

    this.showItemModal = true;
  }

  submit() {
    if (this.itemForm.valid && this.itemForm.dirty && !this.loading) {
      this.loading = true;
      const item: Item = {
        ...this.currentItem,
        ...this.itemForm.value,
        barcodes: this.itemForm.value.barcodes.split(",").map((b: string) => b.trim())
      };

      console.log('save', item);
      this.productsService.updateItem(item, this.isNewItem)
        .subscribe(() => {
          this.getItems();
          this.itemForm.reset();
          this.showItemModal = false;
          this.loading = false;
        }, () => {
          console.log("Some error occured when handling item");
          this.showItemModal = false;
          this.loading = false;
        });
    } else {
      this.showItemModal = false;
    }
  }

}
