import { Component, Input } from "@angular/core";

import { User } from "./../../types/user";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent {
  @Input() includeName = true;
  @Input() user: User;
  @Input() showHeat: boolean = false;
  private colorClasses = ["purple", "orange", "blue", "mint", "whine", "police", "blod"];

  constructor() { }

  getColorClass(): string {
    const index = (parseInt(this.user.id, 10) + this.user.firstname.length) % this.colorClasses.length;
    return this.colorClasses[index];
  }

  getHeatClass(): string {
    if (this.user.debt < 499) {
      return "neutral";
    } else if (this.user.debt < 999) {
      return "warning";
    } else if (this.user.debt >= 1000) {
      return "danger";
    } else {
      return "";
    }
  }

}