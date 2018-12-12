import { Component, Output, ViewChild, HostListener, EventEmitter } from "@angular/core";

import { AutofocusDirective } from "./../auto-focus.directive";

@Component({
  selector: "app-hidden-input",
  template: `
    <input
      appAutofocus
      [(ngModel)]="barcode"
      (keyup.enter)="onChange()" />

    <div *ngIf="flashing" class="flash"></div>
  `,
  styleUrls: ["./hidden-input.component.scss"]
})
export class HiddenInputComponent {
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective;
  @Output() onValueChange: EventEmitter<string> = new EventEmitter<string>();
  private flashTime: number = 100;
  public barcode: string;
  public flashing: boolean = false;

  constructor() { }

  @HostListener("document:click", ["$event.target"])
  onDocumentClick() {
    if (this.autofocus) {
      this.autofocus.focus();
    }
  }

  onChange() {    
    if (this.barcode && !this.flashing) {
      this.flashing = true;
      this.onValueChange.emit(this.barcode);

      setTimeout(() => {
        this.barcode = "";
        this.flashing = false;
      }, this.flashTime);
    }
  }

}