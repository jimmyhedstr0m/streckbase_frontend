import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";

import { FeedService } from "./feed.service";
import { User } from "./../../types/user";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit, OnDestroy {
  private feedSubscription: Subscription;
  public feed: User[];

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedSubscription = this.feedService.getFeed()
      .subscribe((feed: User[]) => this.feed = feed);
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

}