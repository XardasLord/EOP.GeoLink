import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MapComponent } from './components/map/map.component';
import { SharedModule } from '../../shared/shared.module';
import { MapRoutingModule } from './maps-routing.module';
import { MapHelperBarComponent } from './components/map-helper-bar/map-helper-bar.component';
import { MapItemTooltipDialogComponent } from './components/map-item-tooltip-dialog/map-item-tooltip-dialog.component';
import { MapObjectFiltersComponent } from './components/map-object-filters/map-object-filters.component';
import { MapAreaFiltersComponent } from './components/map-area-filters/map-area-filters.component';
import { MapItemContextDialogComponent } from './components/map-item-context-dialog/map-item-context-dialog.component';
import { MapClusterGroupContextDialogComponent } from './components/map-cluster-group-context-dialog/map-cluster-group-context-dialog.component';

@NgModule({
  declarations: [
    MapComponent,
    MapHelperBarComponent,
    MapItemTooltipDialogComponent,
    MapObjectFiltersComponent,
    MapAreaFiltersComponent,
    MapItemContextDialogComponent,
    MapClusterGroupContextDialogComponent,
  ],
  imports: [SharedModule, MapRoutingModule, LeafletModule, LeafletMarkerClusterModule],
  providers: [],
})
export class MapsModule {}
