import { Component, EventEmitter, Output } from '@angular/core';
import { MapFilterModel } from '../../../maps/models/map-filter-model';

@Component({
  selector: 'app-reports-helper-bar',
  templateUrl: './reports-helper-bar.component.html',
  styleUrls: ['./reports-helper-bar.component.scss'],
})
export class ReportsHelperBarComponent {
  @Output() mapFiltersChanged = new EventEmitter<MapFilterModel[]>();
  showObjectFilters = false;
  showRegionFilters = false;
  showStatusFilters = false;
  showIpFilters = false;

  toggleObjectFilters(): void {
    this.showObjectFilters = !this.showObjectFilters;
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
