import { Component, Input } from "@angular/core";

@Component({
  selector: "app-wrapper",
  template: `
    <div class="wrapper" [class.footer-padding]="hasFooter">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ["./wrapper.component.scss"]
})
export class WrapperComponent {
  @Input() hasFooter: boolean = false;
}