import { Component, OnInit, OnDestroy } from "@angular/core";
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-front",
  templateUrl: "./front.component.html",
  styleUrls: ["./front.component.scss"]
})
export class FrontComponent implements OnInit, OnDestroy {
  public faUsers = faUsers;

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}