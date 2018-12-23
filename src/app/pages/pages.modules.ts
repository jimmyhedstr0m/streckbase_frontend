import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ComponentsModule } from "./../components";
import { SharedModule } from "./../shared";

import { AddComponent } from "./add/add.component";
import { FrontComponent } from "./front/front.component";
import { ItemComponent } from "./item/item.component";
import { PartyComponent } from "./party/party.component";
import { UserComponent } from "./user/user.component";
import { UsersComponent } from "./users/users.component";

import { AddService } from "./add/add.service";
import { ItemService } from "./item/item.service";
import { UserService } from "./user/user.service";
import { UsersService } from "./users/users.service";

const routes: Routes = [
  { path: "", component: FrontComponent },
  { path: "add", component: AddComponent },
  { path: "items/:id", component: ItemComponent },
  { path: "items/barcodes/:barcode", component: ItemComponent },
  { path: "party", component: PartyComponent },
  { path: "users", component: UsersComponent },
  { path: "users/:id", component: UserComponent }
];

@NgModule({
  declarations: [
    AddComponent,
    FrontComponent,
    ItemComponent,
    PartyComponent,
    UserComponent,
    UsersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    ComponentsModule,
    SharedModule,
  ],
  exports: [
    ComponentsModule,
    RouterModule
  ],
  providers: [
    AddService,
    ItemService,
    UserService,
    UsersService
  ]
})
export class PagesModule { }
