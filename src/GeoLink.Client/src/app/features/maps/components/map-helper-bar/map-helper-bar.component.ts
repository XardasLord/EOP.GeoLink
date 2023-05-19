import { Component, EventEmitter, Output } from '@angular/core';
import { MapFilterModel } from '../../models/map-filter-model';

@Component({
  selector: 'app-map-helper-bar',
  templateUrl: './map-helper-bar.component.html',
  styleUrls: ['./map-helper-bar.component.scss'],
})
export class MapHelperBarComponent {
  @Output() areaFiltersChanged = new EventEmitter<MapFilterModel[]>();
  showObjectFilters = false;
  showAreaFilters = false;

  toggleObjectFilters(): void {
    this.showObjectFilters = !this.showObjectFilters;
  }

  toggleAreaFilters(): void {
    this.showAreaFilters = !this.showAreaFilters;
  }

  onAreaFiltersChanged($event: MapFilterModel[]) {
    console.warn('MapHelperBarComponent', $event);
    this.areaFiltersChanged.emit($event);
  }
}
