import { Component, EventEmitter, Output } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ReportOpenMode } from '../../../reports/models/open-mode.enum';
import { ReportsState } from '../../../reports/states/reports.state';
import { MapFilterModel } from '../../../maps/models/map-filter-model';
import { RoutePaths } from '../../../../core/modules/app-routing.module';
import { Load, SetOpenMode } from '../../../reports/states/reports.action';

@Component({
  selector: 'app-charts-helper-bar',
  templateUrl: './charts-helper-bar.component.html',
  styleUrls: ['./charts-helper-bar.component.scss'],
})
export class ChartsHelperBarComponent {
  openMode$: Observable<ReportOpenMode> = this.store.select(ReportsState.getOpenMode);
  clusterLabel$: Observable<string> = this.store.select(ReportsState.getClusterLabel);

  @Output() mapFiltersChanged = new EventEmitter<MapFilterModel[]>();
  showObjectFilters = false;
  showDeviceFilters = false;
  showRegionFilters = false;
  showStatusFilters = false;
  showIpFilters = false;

  protected readonly OpenMode = ReportOpenMode;

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
    this.store.dispatch(new Navigate([RoutePaths.Reports]));
    this.store.dispatch(new SetOpenMode(ReportOpenMode.ForCustomSearch));
    this.store.dispatch(new Load());
  }
}
