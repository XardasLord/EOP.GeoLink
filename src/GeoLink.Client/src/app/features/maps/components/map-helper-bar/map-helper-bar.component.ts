import { Component, EventEmitter, Output } from '@angular/core';
import { MapFilterModel } from '../../models/map-filter-model';

@Component({
  selector: 'app-map-helper-bar',
  templateUrl: './map-helper-bar.component.html',
  styleUrls: ['./map-helper-bar.component.scss'],
})
export class MapHelperBarComponent {
  @Output() mapFiltersChanged = new EventEmitter<MapFilterModel[]>();
  showObjectFilters = false;
  showDeviceFilters = false;
  showRegionFilters = false;
  showStatusFilters = false;
  showIpFilters = false;

  toggleObjectFilters(): void {
    this.showObjectFilters = !this.showObjectFilters;
  }

  toggleDeviceFilters(): void {
    this.showDeviceFilters = !this.showDeviceFilters;
  }

  toggleRegionFilters(): void {
    this.showRegionFilters = !this.showRegionFilters;
  }

  toggleStatusFilters(): void {
    this.showStatusFilters = !this.showStatusFilters;
  }

  toggleIpFilters(): void {
    this.showIpFilters = !this.showIpFilters;
  }

  onFiltersChanged($event: MapFilterModel[]) {
    this.mapFiltersChanged.emit($event);
  }
}
