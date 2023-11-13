import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { DictionaryState } from '../../../../shared/states/dictionary.state';
import { OpenEditStatusConfigDialog } from '../../../../shared/states/modal.action';
import { StatusConfigModel } from '../../../../shared/models/status-config.model';
import { Load } from '../../states/statuses-config.action';
import { StatusesConfigState } from '../../states/statuses-config.state';

@Component({
  selector: 'app-statuses-config',
  templateUrl: './statuses-config.component.html',
  styleUrls: ['./statuses-config.component.scss'],
})
export class StatusesConfigComponent implements OnInit {
  displayedColumns: string[] = [
    nameof<StatusConfigModel>('atrName'),
    nameof<StatusConfigModel>('srcStatus'),
    nameof<StatusConfigModel>('srcStatusDescription'),
    nameof<StatusConfigModel>('idStatus'),
    'actions',
  ];

  statusesConfig$ = this.store.select(StatusesConfigState.getStatusesConfigGroupedByAttributeSourceType);
  sourceTypes = this.store.selectSnapshot(DictionaryState.getDeviceAttributeSourceTypes);
  statusTypes = this.store.selectSnapshot(DictionaryState.getMapObjectStatusTypes);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  getAttributeSourceName(idSrc: number) {
    return this.sourceTypes.filter(x => x.id === idSrc)[0].name;
  }

  getGeoLinkStatusName(idStatus: number) {
    return this.statusTypes.filter(x => x.id === idStatus)[0].name;
  }

  changePrivileges(statusConfig: StatusConfigModel) {
    this.store.dispatch(new OpenEditStatusConfigDialog(this.getAttributeSourceName(statusConfig.idSrc), statusConfig));
  }
}
