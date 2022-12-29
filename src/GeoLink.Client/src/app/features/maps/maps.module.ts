import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MapComponent } from './components/map/map.component';
import { SharedModule } from '../../shared/shared.module';
import { MapRoutingModule } from './maps-routing.module';
import { MapHelperBarComponent } from './components/map-helper-bar/map-helper-bar.component';
import { MapItemTooltipDialogComponent } from './components/map-item-tooltip-dialog/map-item-tooltip-dialog.component';
import { MapObjectFiltersComponent } from './components/map-object-filters/map-object-filters.component';

@NgModule({
  declarations: [MapComponent, MapHelperBarComponent, MapItemTooltipDialogComponent, MapObjectFiltersComponent],
  imports: [SharedModule, MapRoutingModule, LeafletModule, LeafletMarkerClusterModule],
})
export class MapsModule {}
