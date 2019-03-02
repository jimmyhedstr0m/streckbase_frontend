import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { switchMap } from "rxjs/operators";

import { faUsers, faQuestion, IconDefinition, faTrophy } from "@fortawesome/free-solid-svg-icons";

import { FrontService } from "./front.service";
import { User } from "./../../types/user";

@Component({
  selector: "app-front",
  templateUrl: "./front.component.html",
  styleUrls: ["./front.component.scss"]
})
export class FrontComponent implements OnInit, OnDestroy {
  private feedSubscription: Subscription;
  public faUsers: IconDefinition = faUsers;
  public faQuestion: IconDefinition = faQuestion;
  public faTrophy: IconDefinition = faTrophy;
  public showHelpModal: boolean = false;
  public feed: User[];
  public highscoreUsers: User[];

  constructor(private router: Router, private frontService: FrontService) { }

  ngOnInit() {
    this.feedSubscription = this.frontService.getFeed()
      .pipe(
        switchMap((feed: User[]) => {
          this.feed = feed;
          return this.frontService.getHighscore();
        })
      )
      .subscribe((highscoreUsers: User[]) => {
        this.highscoreUsers = highscoreUsers;
      });
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

  onValueChange(value: string) {
    this.router.navigate(["/items/barcodes", value]);
  }

  onHelpClick() {
    this.showHelpModal = true;
  }
}