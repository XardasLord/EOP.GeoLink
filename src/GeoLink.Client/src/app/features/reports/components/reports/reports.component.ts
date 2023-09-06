import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapFilterModel } from '../../../maps/models/map-filter-model';
import { ChangeFilters } from '../../../../shared/states/filter.action';
import { FiltersState } from '../../../../shared/states/filters.state';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.changeFilters();
  }

  onFiltersChanged($event: MapFilterModel[]) {
    this.changeFilters();
  }

  private changeFilters() {
    const selectedObjectMapFilters = this.store.selectSnapshot(FiltersState.getSelectedObjectMapFilters);
    const selectedDeviceMapFilters = this.store.selectSnapshot(FiltersState.getSelectedDeviceMapFilters);
    const selectedRegionMapFilters = this.store.selectSnapshot(FiltersState.getSelectedRegionMapFilters);
    const selectedStatusMapFilters = this.store.selectSnapshot(FiltersState.getSelectedStatusMapFilters);

    this.store.dispatch(
      new ChangeFilters(
        selectedObjectMapFilters,
        selectedDeviceMapFilters,
        selectedRegionMapFilters,
        selectedStatusMapFilters
      )
    );
  }
}
