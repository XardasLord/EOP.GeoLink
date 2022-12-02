import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { SharedModule } from '../../shared/shared.module';
import { MapRoutingModule } from './maps-routing.module';

@NgModule({
  declarations: [MapComponent],
  imports: [SharedModule, MapRoutingModule],
})
export class MapsModule {}
