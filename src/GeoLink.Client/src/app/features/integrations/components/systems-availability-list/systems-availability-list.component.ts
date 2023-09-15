import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';
import { LoadSystemAvailabilities } from '../../states/systems-availability.action';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { SystemAvailabilityData } from '../../models/system-availability.model';
import { SystemsAvailabilityState } from '../../states/systems-availability.state';
import { SingleChartDialogComponent } from '../../../../shared/components/single-chart-dialog/single-chart-dialog.component';
import { SingleDeviceChartDialogModel } from '../../../../shared/models/charts/single-device-chart-dialog.model';
import { ChartTypeEnum } from '../../../../shared/models/charts/chart-type.enum';

@Component({
  selector: 'app-systems-availability-list',
  templateUrl: './systems-availability-list.component.html',
  styleUrls: ['./systems-availability-list.component.scss'],
})
export class SystemsAvailabilityListComponent implements OnInit {
  displayedColumns: string[] = [
    nameof<SystemAvailabilityData>('systemName'),
    nameof<SystemAvailabilityData>('healthCheckMethod'),
    nameof<SystemAvailabilityData>('status'),
    'actions',
  ];
  systemsAvailability$ = this.store.select(SystemsAvailabilityState.getSystemsAvailability);

  protected readonly DeviceStatus = MapObjectStatusTypeEnum;

  constructor(
    private store: Store,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadSystemAvailabilities());
  }

  displayChart(systemData: SystemAvailabilityData) {
    // TODO: Move it to the separate store (dispatch action)
    this.matDialog.open(SingleChartDialogComponent, {
      data: <SingleDeviceChartDialogModel>{
        systemId: systemData.idSystem,
        chartType: ChartTypeEnum.Availability,
      },
      width: '800px',
      height: '450px',
    });
  }
}
