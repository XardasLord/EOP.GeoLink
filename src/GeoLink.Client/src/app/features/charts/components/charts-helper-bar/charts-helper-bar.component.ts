import { Component, EventEmitter, Output } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MapFilterModel } from '../../../maps/models/map-filter-model';
import { RoutePaths } from '../../../../core/modules/app-routing.module';
import { ChartsState } from '../../states/charts.state';
import { ChartOpenMode } from '../../models/open-mode.enum';
import { Load, SetOpenMode } from '../../states/charts.action';

@Component({
  selector: 'app-charts-helper-bar',
  templateUrl: './charts-helper-bar.component.html',
  styleUrls: ['./charts-helper-bar.component.scss'],
})
export class ChartsHelperBarComponent {
  openMode$: Observable<ChartOpenMode> = this.store.select(ChartsState.getOpenMode);
  clusterLabel$: Observable<string> = this.store.select(ChartsState.getClusterLabel);

  @Output() mapFiltersChanged = new EventEmitter<MapFilterModel[]>();
  showObjectFilters = false;
  showDeviceFilters = false;
  showRegionFilters = false;
  showStatusFilters = false;
  showIpFilters = false;

  protected readonly OpenMode = ChartOpenMode;

  constructor(private store: Store) {}

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

  removeClusterGroupFilter(): void {
    this.store.dispatch(new Navigate([RoutePaths.Charts]));
    this.store.dispatch(new SetOpenMode(ChartOpenMode.ForCustomSearch));
    this.store.dispatch(new Load());
  }
}
