import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from "./button/button.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ButtonComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ButtonComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
