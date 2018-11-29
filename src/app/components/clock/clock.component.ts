import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-clock",
  templateUrl: "./clock.component.html",
  styleUrls: ["./clock.component.scss"]
})
export class ClockComponent implements OnInit, OnDestroy {
  private interval: number = 1000;
  private timer: any;
  public currentTime: Date;

  constructor() { }

  ngOnInit() {
    this.currentTime = new Date();

    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, this.interval);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}