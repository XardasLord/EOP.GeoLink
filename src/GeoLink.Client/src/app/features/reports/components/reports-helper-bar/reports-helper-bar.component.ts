import { Component, EventEmitter, Output } from '@angular/core';
import { MapFilterModel } from '../../../maps/models/map-filter-model';
import { Observable } from 'rxjs';
import { ReportOpenMode } from '../../models/open-mode.enum';
import { ReportsState } from '../../states/reports.state';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { RoutePaths } from '../../../../core/modules/app-routing.module';
import { ChangeSearchFilters, Load, SetOpenMode } from '../../states/reports.action';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SearchFilterModel } from '../../../../shared/models/filters/search-filter.model';
import { SimpleInputDialogComponent } from '../../../../shared/components/dialogs/simple-input-dialog/simple-input-dialog.component';
import {
  SimpleFormModel,
  SimpleInputDialogDataModel,
} from '../../../../shared/components/dialogs/simple-input-dialog/simple-input-dialog-data.model';
import { Validators } from '@angular/forms';
import { nameof } from '../../../../shared/helpers/name-of.helper';

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

  dialogRef?: MatDialogRef<SimpleInputDialogComponent>;

  protected readonly OpenMode = ReportOpenMode;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {}

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

  openSearchFilters(): void {
    this.loadForm('Szukaj po atrybutach', model => {
      this.store.dispatch(new ChangeSearchFilters(model));
    });
  }

  private loadForm(
    formTitle: string,
    action: (model: SearchFilterModel) => void,
    searchFilterModel?: SearchFilterModel
  ) {
    this.dialogRef = this.dialog.open<SimpleInputDialogComponent>(SimpleInputDialogComponent, {
      data: <SimpleInputDialogDataModel>{
        title: formTitle,
        inputs: [
          {
            controlName: nameof<SearchFilterModel>('city'),
            label: 'Miejscowość',
            type: 'text',
            initValue: searchFilterModel?.city,
          },
          {
            controlName: nameof<SearchFilterModel>('street'),
            label: 'Ulica',
            type: 'text',
            initValue: searchFilterModel?.street,
          },
          {
            controlName: nameof<SearchFilterModel>('ipAddress'),
            label: 'Adres IP',
            type: 'text',
            initValue: searchFilterModel?.ipAddress,
          },
          {
            controlName: nameof<SearchFilterModel>('ppe'),
            label: 'PPE',
            type: 'text',
            initValue: searchFilterModel?.ppe,
          },
        ],
        submitLabel: 'Szukaj',
        submitAction: (formValue: SimpleFormModel) => {
          const model: SearchFilterModel = {
            city: <string>formValue[nameof<SearchFilterModel>('city')],
            street: <string>formValue[nameof<SearchFilterModel>('street')],
            ipAddress: <string>formValue[nameof<SearchFilterModel>('ipAddress')],
            ppe: <string>formValue[nameof<SearchFilterModel>('ppe')],
          };

          action(model);
        },
      },
      width: '400px',
    });
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
