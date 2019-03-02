import { Component } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";

import { FrontService } from "./../front/front.service";
import { User } from "./../../types/user";

@Component({
  selector: "app-party",
  templateUrl: "./party.component.html",
  styleUrls: ["./party.component.scss"]
})
export class PartyComponent {
  private feedSubscription: Subscription;
  public feed: User[];

  constructor(private frontService: FrontService) { }

  ngOnInit() {
    this.feedSubscription = this.frontService.getFeed()
      .subscribe((feed: User[]) => this.feed = feed);
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }
}