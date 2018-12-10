import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PrettyDatePipe } from "./pretty-date.pipe";

import { AutofocusDirective } from "./auto-focus.directive";

import { ActionBarComponent } from "./action-bar/action-bar.component";
import { ButtonComponent } from "./button/button.component";
import { HiddenInputComponent } from "./hidden-input/hidden-input.component";
import { ModalContainerComponent } from "./modal/modal-container.component";
import { ModalComponent } from "./modal/modal.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { UserCardComponent } from "./user-card/user-card.component";
import { WrapperComponent } from "./wrapper/wrapper.component";

import { ModalService } from "./modal/modal.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [
    AutofocusDirective,
    ActionBarComponent,
    ButtonComponent,
    HiddenInputComponent,
    ModalContainerComponent,
    ModalComponent,
    PrettyDatePipe,
    SpinnerComponent,
    UserCardComponent,
    WrapperComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    AutofocusDirective,
    ActionBarComponent,
    ButtonComponent,
    HiddenInputComponent,
    ModalContainerComponent,
    ModalComponent,
    PrettyDatePipe,
    SpinnerComponent,
    UserCardComponent,
    WrapperComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ModalService
      ]
    };
  }
}
