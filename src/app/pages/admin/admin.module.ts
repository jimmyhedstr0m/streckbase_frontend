import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { HistoryComponent } from "./history/history.component";
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { UsersComponent } from "./users/users.component";
import { ComponentsModule } from "./../../components";
import { SharedModule } from "./../../shared";
import { ProductsService } from "./products/products.service";
import { UsersService } from "./users/users.service";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [UsersService],
    children: [
      { path: "", redirectTo: "users", pathMatch: "full" },
      { path: "users", component: UsersComponent },
      { path: "products", component: ProductsComponent },
      { path: "history", component: HistoryComponent }
    ]
  },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ComponentsModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    HistoryComponent,
    LoginComponent,
    ProductsComponent,
    UsersComponent
  ],
  providers: [
    ProductsService,
    UsersService
  ]
})
export class AdminModule { }