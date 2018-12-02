import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-clock",
  templateUrl: "./clock.component.html",
  styleUrls: ["./clock.component.scss"]
})
export class ClockComponent implements OnInit, OnDestroy {
  private interval: number = 1000;
  private timer: any;
  private minutesPerRevolution: number = 12 * 60;
  private minuteCircumference: number = 100;
  private hourCircumference: number;
  public currentTime: Date;
  public hourStrokeArray: string;
  public minutesStrokeArray: string;
  public strokeWidth: number = 3;
  public hourOffset: number;
  public minuteOffset: number;
  public minuteRadius: number;
  public hourRadius: number;

  constructor() {
    this.minuteRadius = this.minuteCircumference / (2 * Math.PI);
    this.minuteOffset = this.minuteCircumference * .25;
    this.hourRadius = (this.minuteCircumference / Math.PI - 2 * this.strokeWidth) / 2;
    this.hourCircumference = 2 * this.hourRadius * Math.PI;
    this.hourOffset = this.hourCircumference * .25;
  }

  ngOnInit() {
    this.currentTime = new Date();
    this.calculateTimePercentage();

    this.timer = setInterval(() => {
      this.currentTime = new Date();
      this.calculateTimePercentage();
    }, this.interval);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  private calculateTimePercentage() {
    const currentMinutes: number = this.currentTime.getMinutes();
    const currentHour: number = (this.currentTime.getHours() % 12) * 60;
    const hourPercentage: number = currentHour / this.minutesPerRevolution;
    const minutesPercentage: number = currentMinutes / 60;

    this.minutesStrokeArray = `${minutesPercentage * this.minuteCircumference} ${(1 - minutesPercentage) * this.minuteCircumference}`;
    this.hourStrokeArray = `${hourPercentage * this.hourCircumference} ${(1 - hourPercentage) * this.hourCircumference}`;
  }
}