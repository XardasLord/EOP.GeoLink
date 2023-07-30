import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { ReportsState } from '../../states/reports.state';
import { ChangePage, Load } from '../../states/reports.action';
import { ReportModel } from '../../models/report.model';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';
import { ChartTypeEnum } from '../../../../shared/models/charts/chart-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { SingleDeviceChartDialogComponent } from '../../../../shared/components/single-device-chart-dialog/single-device-chart-dialog.component';
import { SingleDeviceChartDialogModel } from '../../../../shared/models/charts/single-device-chart-dialog.model';

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

  protected readonly DeviceStatus = MapObjectStatusTypeEnum;
  protected readonly MapObjectStatusTypeEnum = MapObjectStatusTypeEnum;

  constructor(
    private store: Store,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  pageChanged(event: PageEvent): void {
    this.store.dispatch(new ChangePage(event));
  }

  displayChart(report: ReportModel) {
    // TODO: Move it to the separate store (dispatch action)
    this.matDialog.open(SingleDeviceChartDialogComponent, {
      data: <SingleDeviceChartDialogModel>{
        deviceId: report.actions.chartIdDev,
        chartType: ChartTypeEnum.Availability,
      },
    });
  }

  showOnMap(report: ReportModel) {
    alert(`${report.actions.mapLat} ${report.actions.mapLon}`);
  }
}
