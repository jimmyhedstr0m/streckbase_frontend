import { Component, Input, forwardRef, ChangeDetectorRef, Renderer2, ElementRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { faCheck, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-checkbox",
  template: `
    <label>
      <input type="checkbox" (change)="onChange($event.target.checked)" (blur)="onTouched()" [checked]="checked" />
      <span>
        <fa-icon [icon]="faCheck" size="md"></fa-icon>
      </span>
      <span>{{ label }}</span>
    </label>
  `,
  styleUrls: ["./checkbox.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() checked: boolean;
  @Input() label: string;
  public faCheck: IconDefinition = faCheck;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  onChange = (_: any) => { };

  onTouched = () => { };

  writeValue(value: any): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, "checked", value);
    this.checked = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, "disabled", isDisabled.toString());
  }
}