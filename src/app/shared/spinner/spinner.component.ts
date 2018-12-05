import { Component, Input } from "@angular/core";

@Component({
  selector: "app-spinner",
  template: `
    <div *ngIf="show" class="loader">Loading...</div>
  `,
  styleUrls: ["./spinner.component.scss"]
})
export class SpinnerComponent {
  @Input() show: boolean = false;

  constructor() { }

}