import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

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
    CommonModule
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
