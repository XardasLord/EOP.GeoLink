import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapFilterModel } from '../../../maps/models/map-filter-model';
import { MapsState } from '../../../maps/states/maps.state';
import { ChangeFilters, Load } from '../../states/charts.action';
import { Observable } from 'rxjs';
import { ChartsState } from '../../states/charts.state';
import { ChartModel } from '../../../../shared/models/charts/chart.model';
import { ChartTypeEnum } from '../../../../shared/models/charts/chart-type.enum';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  chartModel$: Observable<ChartModel | null> = this.store.select(ChartsState.getChart);

  protected readonly ChartTypeEnum = ChartTypeEnum;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.changeFilters();
    this.store.dispatch(new Load());
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

    // TODO: Can be called multiple times and calls to API done multiple times - to resolve somehow
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
