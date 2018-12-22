import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { appConfig } from "./../../app.config";
import { UsersService } from "./users.service";

import { User } from "./../../types/user";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit, OnDestroy {
  private timer: any;
  public lobare: User[];
  public xlobare: User[];
  public faChevronLeft = faChevronLeft;

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.setTimer();

    this.usersService.getUsers()
      .subscribe((users: User[]) => {
        this.lobare = users.filter((user: User) => user.lobare);
        this.xlobare = users.filter((user: User) => !user.lobare).reverse();
      });
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private setTimer() {
    this.timer = setTimeout(() => this.router.navigateByUrl("/"), appConfig.defaultTime);
  }

  onValueChange(barcode: string) {
    this.router.navigate(["/items/barcodes", barcode]);
  }

}