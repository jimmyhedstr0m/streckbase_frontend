import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { HistoryComponent } from "./history/history.component";
import { ProductsComponent } from "./products/products.component";
import { UsersComponent } from "./users/users.component";
import { ComponentsModule } from "./../../components";
import { SharedModule } from "./../../shared";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "", redirectTo: "users", pathMatch: "full" },
      { path: "users", component: UsersComponent },
      { path: "products", component: ProductsComponent },
      { path: "history", component: HistoryComponent }
    ]
  }
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
    ProductsComponent,
    UsersComponent
  ]
})
export class AdminModule { }