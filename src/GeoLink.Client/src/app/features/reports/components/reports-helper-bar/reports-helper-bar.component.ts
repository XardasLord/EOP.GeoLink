import { Component, EventEmitter, Output } from '@angular/core';
import { MapFilterModel } from '../../../maps/models/map-filter-model';
import { Observable } from 'rxjs';
import { ReportOpenMode } from '../../models/open-mode.enum';
import { ReportsState } from '../../states/reports.state';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { RoutePaths } from '../../../../core/modules/app-routing.module';
import { Load, SetOpenMode } from '../../states/reports.action';

@Component({
  selector: 'app-reports-helper-bar',
  templateUrl: './reports-helper-bar.component.html',
  styleUrls: ['./reports-helper-bar.component.scss'],
})
export class ReportsHelperBarComponent {
  openMode$: Observable<ReportOpenMode> = this.store.select(ReportsState.getOpenMode);
  clusterLabel$: Observable<string> = this.store.select(ReportsState.getClusterLabel);

  @Output() mapFiltersChanged = new EventEmitter<MapFilterModel[]>();
  showObjectFilters = false;
  showDeviceFilters = false;
  showRegionFilters = false;
  showStatusFilters = false;

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

  onFiltersChanged($event: MapFilterModel[]) {
    this.mapFiltersChanged.emit($event);
  }

  removeClusterGroupFilter(): void {
    this.store.dispatch(new Navigate([RoutePaths.Reports]));
    this.store.dispatch(new SetOpenMode(ReportOpenMode.ForCustomSearch));
    this.store.dispatch(new Load());
  }
}
