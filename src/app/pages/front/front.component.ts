import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-front",
  templateUrl: "./front.component.html",
  styleUrls: ["./front.component.scss"]
})
export class FrontComponent {
  public faUsers = faUsers;

  constructor(private router: Router) { }

  onValueChange(value: string) {
    this.router.navigate(["/items/barcodes", value]);
  }
}