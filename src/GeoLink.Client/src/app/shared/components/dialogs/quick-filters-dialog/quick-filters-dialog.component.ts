import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DeleteQuickFilter, LoadQuickFilter, LoadQuickFilters, SaveQuickFilters } from '../../../states/filter.action';
import { FiltersState } from '../../../states/filters.state';
import { SimpleFormModel, SimpleInputDialogDataModel } from '../simple-input-dialog/simple-input-dialog-data.model';
import { SimpleInputDialogComponent } from '../simple-input-dialog/simple-input-dialog.component';
import { QuickFilterModel } from '../../../models/filters/quick-filter.model';

@Component({
  selector: 'app-quick-filters-dialog',
  templateUrl: './quick-filters-dialog.component.html',
  styleUrls: ['./quick-filters-dialog.component.scss'],
})
export class QuickFiltersDialogComponent implements OnInit {
  quickFilters$ = this.store.select(FiltersState.getQuickFilterModels);

  dialogRef?: MatDialogRef<SimpleInputDialogComponent>;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadQuickFilters());
  }

  saveCurrentFilters() {
    this.dialogRef = this.dialog.open<SimpleInputDialogComponent>(SimpleInputDialogComponent, {
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
              objectFilters: this.store
                .selectSnapshot(FiltersState.getSelectedObjectMapFilters)
                .filter(x => x.apiFilterType === 'ObjectTypeFilters' && x.idFilter !== null)
                .map(x => x.idFilter!),
              deviceFilters: this.store
                .selectSnapshot(FiltersState.getSelectedDeviceMapFilters)
                .filter(x => x.apiFilterType === 'DeviceFilters' && x.idFilter !== null)
                .map(x => x.idFilter!),
              regionFilters: this.store
                .selectSnapshot(FiltersState.getSelectedRegionMapFilters)
                .filter(x => x.apiFilterType === 'RegionFilters' && x.idFilter !== null)
                .map(x => x.idFilter!),
              statusFilters: this.store
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
    this.store.dispatch(new DeleteQuickFilter(id));
  }

  loadSelectedFilter(filter: QuickFilterModel) {
    this.store.dispatch(new LoadQuickFilter(filter));
  }
}
