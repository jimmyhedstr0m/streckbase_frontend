import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, TemplateRef } from "@angular/core";
import { faTimes, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { ModalService } from "./modal.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnChanges {
  @ViewChild("template") template: TemplateRef<any>;
  @Input() show: boolean = false;
  @Input() title: string = "";
  @Input() cancelable: boolean = false;
  @Input() allowOutsideClick: boolean = true;
  @Input() includeFooter: boolean = true;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() action: EventEmitter<Event> = new EventEmitter<Event>();
  public faTimes: IconDefinition = faTimes;

  constructor(private modalService: ModalService) { }

  ngOnChanges(changes: any) {
    if (changes && changes.show) {
      this.toggle(changes.show.currentValue);
    }
  }

  toggle(show: boolean) {
    this.show = show;
    this.showChange.emit(this.show);

    if (this.show) {
      this.modalService.open(this);
    } else {
      this.modalService.close(this);
    }
  }

  confirmClick(event: Event) {
    if (this.action.observers.length > 0) {
      this.action.emit(event);
    } else {
      this.toggle(false);
    }
  }

  outsideClick(event: Event) {
    if (this.allowOutsideClick) {
      this.confirmClick(event);
    }
  }

}