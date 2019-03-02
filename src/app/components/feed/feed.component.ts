import { Component, Input } from "@angular/core";

import { User } from "./../../types/user";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent {
  @Input() feed: User[];
}