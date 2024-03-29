import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DeleteQuickFilter, LoadQuickFilter, LoadQuickFilters, SaveQuickFilters } from '../../../states/filter.action';
import { FiltersState } from '../../../states/filters.state';
import { SimpleFormModel, SimpleInputDialogDataModel } from '../simple-input-dialog/simple-input-dialog-data.model';
import { SimpleInputDialogComponent } from '../simple-input-dialog/simple-input-dialog.component';
import { QuickFilterModel } from '../../../models/filters/quick-filter.model';
import { SimpleConfirmDialogComponent } from '../simple-confirm-dialog/simple-confirm-dialog.component';
import { SimpleConfirmDialogDataModel } from '../simple-confirm-dialog/simple-confirm-dialog-data.model';

@Component({
  selector: 'app-quick-filters-dialog',
  templateUrl: './quick-filters-dialog.component.html',
  styleUrls: ['./quick-filters-dialog.component.scss'],
})
export class QuickFiltersDialogComponent implements OnInit {
  quickFilters$ = this.store.select(FiltersState.getQuickFilterModels);

  dialogSaveFiltersRef?: MatDialogRef<SimpleInputDialogComponent>;
  dialogConfirmationRef?: MatDialogRef<SimpleConfirmDialogComponent>;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadQuickFilters());
  }

  saveCurrentFilters() {
    this.dialogSaveFiltersRef = this.dialog.open<SimpleInputDialogComponent>(SimpleInputDialogComponent, {
      data: <SimpleInputDialogDataModel>{
        title: 'Zapisz szybki filtr',
        inputs: [
          {
            label: 'Nazwa filtru',
            type: 'text',
            initValue: '',
            options: { validators: Validators.required },
          },
        ],
        submitLabel: 'Zapisz',
        submitAction: (formValue: SimpleFormModel) => {
          if (formValue?.[0]) {
            const payload: QuickFilterModel = {
              id: undefined,
              name: formValue[0].toString(),
              objectFilterIds: this.store
                .selectSnapshot(FiltersState.getSelectedObjectMapFilters)
                .filter(x => x.apiFilterType === 'ObjectTypeFilters' && x.idFilter !== null)
                .map(x => x.idFilter!),
              deviceFilterIds: this.store
                .selectSnapshot(FiltersState.getSelectedDeviceMapFilters)
                .filter(x => x.apiFilterType === 'DeviceFilters' && x.idFilter !== null)
                .map(x => x.idFilter!),
              regionFilterIds: this.store
                .selectSnapshot(FiltersState.getSelectedRegionMapFilters)
                .filter(x => x.apiFilterType === 'RegionFilters' && x.idFilter !== null)
                .map(x => x.idFilter!),
              statusFilterIds: this.store
                .selectSnapshot(FiltersState.getSelectedStatusMapFilters)
                .filter(x => x.apiFilterType === 'StatusFilters' && x.idFilter !== null)
                .map(x => x.idFilter!),
            };
            this.store.dispatch(new SaveQuickFilters(payload));
          }
        },
      },
      width: '400px',
    });
  }

  deleteQuickFilter(id: number) {
    this.dialogConfirmationRef = this.dialog.open<SimpleConfirmDialogComponent, SimpleConfirmDialogDataModel>(
      SimpleConfirmDialogComponent,
      {
        data: <SimpleConfirmDialogDataModel>{
          title: 'Czy na pewno chcesz usunąć szybki filtr?',
          primaryBtnLabel: 'Zatwierdź',
          secondaryBtnLabel: 'Anuluj',
          primaryAction: () => {
            this.store.dispatch(new DeleteQuickFilter(id));
          },
        },
        width: '400px',
      }
    );
  }

  loadSelectedFilter(filter: QuickFilterModel) {
    this.store.dispatch(new LoadQuickFilter(filter));
  }
}
