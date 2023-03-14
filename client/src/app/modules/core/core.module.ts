import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from './services/ensure-module-loaded-once.guard';
import { FooterComponent } from './components/footer/footer.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';

@NgModule({
  declarations: [
    FooterComponent,
    MainHeaderComponent
  ],
  imports: [] // Import SharedModule
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
