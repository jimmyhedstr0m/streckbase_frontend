import { Component, OnInit, OnDestroy, Input } from "@angular/core";

import { Link } from "./link";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() links: Link[] = [];

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}