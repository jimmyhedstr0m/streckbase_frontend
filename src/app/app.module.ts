import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AddComponent } from './add/add.component';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { FeedComponent } from './feed/feed.component';
import { FrontComponent } from './front/front.component';
import { ProductComponent } from './product/product.component';

import { AddService } from "./add/add.service";
import { FeedService } from './feed/feed.service';
import { ProductService } from './product/product.service';

registerLocaleData(localeSv, 'sv');

@NgModule({
  declarations: [
    AddComponent,
    AppComponent,
    ClockComponent,
    FeedComponent,
    FrontComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'sv' },
    AddService,
    FeedService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
