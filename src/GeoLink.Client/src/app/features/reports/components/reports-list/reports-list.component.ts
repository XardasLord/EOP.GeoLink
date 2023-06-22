import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { ReportsState } from '../../states/reports.state';
import { Load } from '../../states/reports.action';
import { ReportModel } from '../../models/report.model';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
})
export class ReportsListComponent implements OnInit {
  displayedColumns: string[] = [
    nameof<ReportModel>('object'),
    nameof<ReportModel>('device'),
    nameof<ReportModel>('ipAddress'),
    nameof<ReportModel>('stationNumber'),
    nameof<ReportModel>('stationName'),
    nameof<ReportModel>('region'),
    nameof<ReportModel>('tan'),
    nameof<ReportModel>('status'),
    nameof<ReportModel>('availability'),
  ];
  reports$ = this.store.select(ReportsState.getReports);
  DeviceStatus = MapObjectStatusTypeEnum;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  protected readonly MapObjectStatusTypeEnum = MapObjectStatusTypeEnum;
}
