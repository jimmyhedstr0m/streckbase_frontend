import { Component } from "@angular/core";

@Component({
  selector: "app-wrapper",
  template: `
    <div class="wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ["./wrapper.component.scss"]
})
export class WrapperComponent { }