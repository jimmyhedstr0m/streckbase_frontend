import { Component } from "@angular/core";
// import { Router } from "@angular/router";

@Component({
  selector: "app-hidden-input",
  template: `
    <input [(ngModel)]="barcode" (ngModelChange)="onChange($event)" />
  `,
  styleUrls: ["./hidden-input.component.scss"]
})
export class HiddenInputComponent {
  barcode: string;

  onChange(val) {
    console.log('val', val);
  }

  // constructor(private router: Router) { }

  // onClick(_event: Event) {
  //   if (this.to) {
  //     this.router.navigateByUrl(this.to);
  //   }
  // }

}