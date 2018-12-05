import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "./../shared";

import { ClockComponent } from "./clock/clock.component";
import { FeedComponent } from "./feed/feed.component";
import { HeaderComponent } from "./header/header.component";

import { FeedService } from "./feed/feed.service";

@NgModule({
  declarations: [
    ClockComponent,
    FeedComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  providers: [
    FeedService
  ],
  exports: [
    ClockComponent,
    FeedComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
