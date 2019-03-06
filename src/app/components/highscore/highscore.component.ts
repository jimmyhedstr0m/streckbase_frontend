import { Component, Input } from "@angular/core";

import { IconDefinition, faTrophy } from "@fortawesome/free-solid-svg-icons";

import { User } from "./../../types/user";

@Component({
  selector: "app-highscore",
  templateUrl: "./highscore.component.html",
  styleUrls: ["./highscore.component.scss"]
})
export class HighscoreComponent {
  @Input() users: User[];
  public faTrophy: IconDefinition = faTrophy;
}