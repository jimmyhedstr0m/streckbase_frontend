import { NgModule, Optional, SkipSelf } from "@angular/core";

import { ImageService } from "./image.service";

@NgModule({
  providers: [
    ImageService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("Only import CoreModule once!");
    }
  }
}
