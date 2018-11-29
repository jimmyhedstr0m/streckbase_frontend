import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule, registerLocaleData } from "@angular/common";
import localeSv from "@angular/common/locales/sv";

import { ComponentsModule } from "./components/components.module";

import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { AddComponent } from "./pages/add/add.component";
import { AppComponent } from "./app.component";
import { FrontComponent } from "./pages/front/front.component";
import { ProductComponent } from "./pages/product/product.component";

import { AddService } from "./pages/add/add.service";
import { ProductService } from "./pages/product/product.service";

registerLocaleData(localeSv, "sv");

@NgModule({
  declarations: [
    AddComponent,
    AppComponent,
    FrontComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    CoreModule,
    ComponentsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "sv" },
    AddService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
