import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "./../shared";

import { ClockComponent } from "./clock/clock.component";
import { FeedComponent } from "./feed/feed.component";
import { HeaderComponent } from "./header/header.component";
import { HighscoreComponent } from "./highscore/highscore.component";
import { MenuComponent } from "./menu/menu.component";

@NgModule({
  declarations: [
    ClockComponent,
    FeedComponent,
    HeaderComponent,
    HighscoreComponent,
    MenuComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  providers: [

  ],
  exports: [
    ClockComponent,
    FeedComponent,
    HeaderComponent,
    HighscoreComponent,
    MenuComponent
  ]
})
export class ComponentsModule { }
