import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private interval: number = 1000;
  private timer: any;
  private routeSubscription: Subscription;
  public isHomeRoute: boolean = true;
  public currentTime: Date;

  constructor(private router: Router) { }

  ngOnInit() {
    this.currentTime = new Date();
    this.routeSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.isHomeRoute = event.urlAfterRedirects === "/";
      });

    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, this.interval);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    clearInterval(this.timer);
  }

}