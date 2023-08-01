import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';
import { Load } from '../../states/systems-availability.action';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { SystemAvailabilityData } from '../../models/system-availability.model';
import { SystemsAvailabilityState } from '../../states/systems-availability.state';

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
  ];
  systemsAvailability$ = this.store.select(SystemsAvailabilityState.getSystemsAvailability);

  protected readonly DeviceStatus = MapObjectStatusTypeEnum;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }
}
