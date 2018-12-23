import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-action-bar",
  templateUrl: "./action-bar.component.html",
  styleUrls: ["./action-bar.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ActionBarComponent {
  @Input() background: boolean = false;
  @Input() position: string;

  constructor() { }

}