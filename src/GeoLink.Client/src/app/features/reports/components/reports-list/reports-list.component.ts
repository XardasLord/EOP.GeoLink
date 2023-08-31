import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { ReportsState } from '../../states/reports.state';
import { ChangePage, Load } from '../../states/reports.action';
import { ReportModel } from '../../models/report.model';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';
import { ChartTypeEnum } from '../../../../shared/models/charts/chart-type.enum';
import { SingleChartDialogComponent } from '../../../../shared/components/single-chart-dialog/single-chart-dialog.component';
import { SingleDeviceChartDialogModel } from '../../../../shared/models/charts/single-device-chart-dialog.model';
import { RoutePaths } from '../../../../core/modules/app-routing.module';
import { ReportOpenMode } from '../../models/open-mode.enum';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
})
export class ReportsListComponent implements OnInit {
  displayedColumns: string[] = [
    nameof<ReportModel>('objType'),
    nameof<ReportModel>('devType'),
    nameof<ReportModel>('ipAddress'),
    nameof<ReportModel>('objNr'),
    nameof<ReportModel>('objName'),
    nameof<ReportModel>('objRegion'),
    nameof<ReportModel>('objStatus'),
    nameof<ReportModel>('availability'),
    'actions',
  ];
  loading$ = this.store.select(ReportsState.getIsLoading);
  reports$ = this.store.select(ReportsState.getReports);
  totalItems$ = this.store.select(ReportsState.getReportsCount);
  currentPage$ = this.store.select(ReportsState.getCurrentPage);
  pageSize$ = this.store.select(ReportsState.getPageSize);
  openMode$: Observable<ReportOpenMode> = this.store.select(ReportsState.getOpenMode);

  protected readonly DeviceStatus = MapObjectStatusTypeEnum;
  protected readonly MapObjectStatusTypeEnum = MapObjectStatusTypeEnum;

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  pageChanged(event: PageEvent): void {
    this.store.dispatch(new ChangePage(event));
  }

  displayChart(report: ReportModel) {
    // TODO: Move it to the separate store (dispatch action)
    this.matDialog.open(SingleChartDialogComponent, {
      data: <SingleDeviceChartDialogModel>{
        deviceId: report.actions.chartIdDev,
        chartType: ChartTypeEnum.Availability,
      },
    });
  }

  showOnMap(report: ReportModel) {
    this.store.dispatch(
      new Navigate([RoutePaths.Map], {
        lat: report.actions.mapLat,
        lon: report.actions.mapLon,
      })
    );
  }
}
