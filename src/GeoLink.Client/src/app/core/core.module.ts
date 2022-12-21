import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { AppNgxsModule } from './modules/app-ngxs.module';
import { MapsState } from '../features/maps/states/maps.state';
import { IMapsService } from '../features/maps/services/maps.service.base';
import { MapsService } from '../features/maps/services/maps.service';

@NgModule({
  declarations: [NavigationComponent, ToolbarComponent],
  imports: [SharedModule, AppRoutingModule, AppNgxsModule, NgxsModule.forRoot([MapsState])],
  providers: [{ provide: IMapsService, useClass: MapsService }],
})
export class CoreModule {}
