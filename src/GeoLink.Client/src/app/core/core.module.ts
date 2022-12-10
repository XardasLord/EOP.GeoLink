import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { AppNgxsModule } from './modules/app-ngxs.module';

@NgModule({
  declarations: [NavigationComponent, ToolbarComponent],
  imports: [SharedModule, AppRoutingModule, AppNgxsModule],
})
export class CoreModule {}
