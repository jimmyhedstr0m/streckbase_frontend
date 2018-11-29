import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddComponent } from "./pages/add/add.component";
import { FrontComponent } from "./pages/front/front.component";
import { ProductComponent } from "./pages/product/product.component";

const routes: Routes = [
  { path: "", component: FrontComponent },
  { path: "add", component: AddComponent },
  { path: "product/:id", component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
