import { Component, ViewChild, HostListener } from "@angular/core";
import { Router } from "@angular/router";

import { AutofocusDirective } from "./../auto-focus.directive";
import { environment } from "./../../../environments/environment";

@Component({
  selector: "app-hidden-input",
  template: `
    <input appAutofocus [(ngModel)]="barcode" (ngModelChange)="onChange($event)" [hidden]="hidden" />
  `,
  styleUrls: ["./hidden-input.component.scss"]
})
export class HiddenInputComponent {
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective;
  private oldValue: string;
  public barcode: string;
  public hidden: boolean = environment.production;

  constructor(private router: Router) { }

  @HostListener("document:click", ["$event.target"])
  onDocumentClick() {
    if (this.autofocus) {
      this.autofocus.focus();
    }
  }

  onChange(newValue: string) {
    if (newValue && newValue !== this.oldValue) {
      this.oldValue = newValue;
      this.router.navigate(["/items/barcodes", newValue]);
    }
  }

}