import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ComponentsModule } from "./../components";
import { SharedModule } from "./../shared";

import { AddComponent } from "./add/add.component";
import { FrontComponent } from "./front/front.component";
import { ProductComponent } from "./product/product.component";
import { UsersComponent } from "./users/users.component";

import { AddService } from "./add/add.service";
import { ProductService } from "./product/product.service";
import { UsersService } from "./users/users.service";

const routes: Routes = [
  { path: "", component: FrontComponent },
  { path: "add", component: AddComponent },
  { path: "product/:id", component: ProductComponent },
  { path: "users", component: UsersComponent }
];

@NgModule({
  declarations: [
    AddComponent,
    FrontComponent,
    ProductComponent,
    UsersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
    ComponentsModule
  ],
  exports: [
    RouterModule,
    ComponentsModule
  ],
  providers: [
    AddService,
    ProductService,
    UsersService
  ]
})
export class PagesModule { }
