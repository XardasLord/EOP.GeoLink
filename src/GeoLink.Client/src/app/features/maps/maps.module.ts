import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { SharedModule } from '../../shared/shared.module';
import { MapRoutingModule } from './maps-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapHelperBarComponent } from './components/map-helper-bar/map-helper-bar.component';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

@NgModule({
  declarations: [MapComponent, MapHelperBarComponent],
  imports: [SharedModule, MapRoutingModule, LeafletModule, LeafletMarkerClusterModule],
})
export class MapsModule {}
