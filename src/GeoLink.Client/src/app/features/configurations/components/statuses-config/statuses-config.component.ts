import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { EnumDescriptionWithScopesModel } from '../../../../shared/models/enum-description-with-scopes.model';
import { DictionaryState } from '../../../../shared/states/dictionary.state';
import { OpenEditPrivilegesDialogForGroup } from '../../../../shared/states/modal.action';
import { StatusConfigModel } from '../../../../shared/models/status-config.model';

@Component({
  selector: 'app-statuses-config',
  templateUrl: './statuses-config.component.html',
  styleUrls: ['./statuses-config.component.scss'],
})
export class StatusesConfigComponent {
  displayedColumns: string[] = [
    nameof<StatusConfigModel>('atrName'),
    nameof<StatusConfigModel>('srcStatus'),
    nameof<StatusConfigModel>('srcStatusDescription'),
    nameof<StatusConfigModel>('idStatus'),
    'actions',
  ];

  statusesConfig$ = this.store.select(DictionaryState.getStatusesConfigGroupedByAttributeSourceType);
  sourceTypes = this.store.selectSnapshot(DictionaryState.getDeviceAttributeSourceTypes);
  statusTypes = this.store.selectSnapshot(DictionaryState.getMapObjectStatusTypes);

  constructor(private store: Store) {}

  getAttributeSourceName(idSrc: number) {
    return this.sourceTypes.filter(x => x.id === idSrc)[0].name;
  }

  getGeoLinkStatusName(idStatus: number) {
    return this.statusTypes.filter(x => x.id === idStatus)[0].name;
  }

  changePrivileges(group: EnumDescriptionWithScopesModel) {
    this.store.dispatch(new OpenEditPrivilegesDialogForGroup(group));
  }
}
