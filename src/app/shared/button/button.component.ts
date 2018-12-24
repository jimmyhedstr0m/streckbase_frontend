import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() modifiers: string[] = [];
  @Input() to?: string;
  @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private router: Router) { }

  onClick(event: Event) {
    if (this.click.observers.length > 0) {
      this.click.emit(event);
    }

    if (this.to) {
      this.router.navigateByUrl(this.to);
    }
  }

}