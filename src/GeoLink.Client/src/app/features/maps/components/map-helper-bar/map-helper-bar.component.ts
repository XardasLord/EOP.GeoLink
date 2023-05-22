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
  showRegionFilters = false;
  showStatusFilters = false;

  toggleObjectFilters(): void {
    this.showObjectFilters = !this.showObjectFilters;
  }

  toggleRegionFilters(): void {
    this.showRegionFilters = !this.showRegionFilters;
  }

  toggleStatusFilters(): void {
    this.showStatusFilters = !this.showStatusFilters;
  }

  onFiltersChanged($event: MapFilterModel[]) {
    this.mapFiltersChanged.emit($event);
  }
}
