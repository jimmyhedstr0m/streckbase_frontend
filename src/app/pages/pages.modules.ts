import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ComponentsModule } from "./../components";

import { AddComponent } from "./add/add.component";
import { FrontComponent } from "./front/front.component";
import { ProductComponent } from "./product/product.component";

import { AddService } from "./add/add.service";
import { ProductService } from "./product/product.service";

const routes: Routes = [
  { path: "", component: FrontComponent },
  { path: "add", component: AddComponent },
  { path: "product/:id", component: ProductComponent }
];

@NgModule({
  declarations: [
    AddComponent,
    FrontComponent,
    ProductComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AddService,
    ProductService
  ]
})
export class PagesModule { }
