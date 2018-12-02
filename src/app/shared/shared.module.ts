import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonComponent } from "./button/button.component";
import { ModalContainerComponent } from "./modal/modal-container.component";
import { ModalComponent } from "./modal/modal.component";

import { ModalService } from "./modal/modal.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [
    ButtonComponent,
    ModalContainerComponent,
    ModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ButtonComponent,
    ModalContainerComponent,
    ModalComponent
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
