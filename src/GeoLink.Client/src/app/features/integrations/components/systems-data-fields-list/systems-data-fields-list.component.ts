import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { SystemsAvailabilityState } from '../../states/systems-availability.state';
import { LoadSystemDataFields } from '../../states/systems-availability.action';
import { SystemDataFieldData } from '../../models/system-data-field.model';

@Component({
  selector: 'app-systems-data-fields-list',
  templateUrl: './systems-data-fields-list.component.html',
  styleUrls: ['./systems-data-fields-list.component.scss'],
})
export class SystemsDataFieldsListComponent implements OnInit {
  displayedColumns: string[] = [
    nameof<SystemDataFieldData>('sourceField'),
    nameof<SystemDataFieldData>('geolinkField'),
    nameof<SystemDataFieldData>('info'),
  ];
  systemsDataFields$ = this.store.select(SystemsAvailabilityState.getSystemsDataFields);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadSystemDataFields());
  }
}
