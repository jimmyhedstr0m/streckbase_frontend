import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import localeSv from "@angular/common/locales/sv";

import { PagesModule } from "./pages/pages.modules";

import { CoreModule } from "./core/core.module";

import { AppComponent } from "./app.component";

registerLocaleData(localeSv, "sv");

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    PagesModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "sv" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
