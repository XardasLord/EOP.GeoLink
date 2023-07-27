import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapFilterModel } from '../../../maps/models/map-filter-model';
import { MapsState } from '../../../maps/states/maps.state';
import { ChangeFilters } from '../../states/reports.action';

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
    const selectedObjectMapFilters = this.store.selectSnapshot(MapsState.getObjectSelectedMapFilters);
    const selectedDeviceMapFilters = this.store.selectSnapshot(MapsState.getDeviceSelectedMapFilters);
    const selectedRegionMapFilters = this.store.selectSnapshot(MapsState.getRegionSelectedMapFilters);
    const selectedStatusMapFilters = this.store.selectSnapshot(MapsState.getStatusSelectedMapFilters);
    const selectedIpMapFilters = this.store.selectSnapshot(MapsState.getIpSelectedMapFilters);

    this.store.dispatch(
      new ChangeFilters(
        selectedObjectMapFilters,
        selectedDeviceMapFilters,
        selectedRegionMapFilters,
        selectedStatusMapFilters,
        selectedIpMapFilters
      )
    );
  }
}
