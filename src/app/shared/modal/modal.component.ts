import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, TemplateRef } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
  @Output() showChange: EventEmitter<boolean> = new EventEmitter();
  public faTimes = faTimes;

  constructor(private modalService: ModalService) { }

  ngOnChanges(changes: any) {
    if (changes && changes.show && changes.show.currentValue) {
      this.toggle(true);
    }
  }

  toggle(show: boolean) {
    this.show = show;
    this.showChange.emit(this.show);

    if (this.show) {
      this.modalService.open(this);
    } else {
      this.modalService.close(this)
    }
  }

}