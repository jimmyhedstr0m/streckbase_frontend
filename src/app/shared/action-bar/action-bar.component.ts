import { Component, Input } from "@angular/core";

@Component({
  selector: "app-action-bar",
  templateUrl: "./action-bar.component.html",
  styleUrls: ["./action-bar.component.scss"]
})
export class ActionBarComponent {
  @Input() background: boolean = false;
  @Input() position: string;

  constructor() { }

}