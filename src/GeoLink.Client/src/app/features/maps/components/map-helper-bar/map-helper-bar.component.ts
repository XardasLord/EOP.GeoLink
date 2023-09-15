import { Component, EventEmitter, Output } from '@angular/core';
import { MapFilterModel } from '../../models/map-filter-model';
import { FilterAttributeModel } from '../../../../shared/models/filters/filter-attribute.model';
import { getInputDialogDataModelForFilterAttributes } from '../../../../shared/helpers/filter-attributes.helper';
import { SimpleInputDialogComponent } from '../../../../shared/components/dialogs/simple-input-dialog/simple-input-dialog.component';
import { SimpleInputDialogDataModel } from '../../../../shared/components/dialogs/simple-input-dialog/simple-input-dialog-data.model';
import { Store } from '@ngxs/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangeSearchFilters } from '../../../../shared/states/filter.action';
import { FiltersState } from '../../../../shared/states/filters.state';
import { QuickFiltersDialogComponent } from '../../../../shared/components/dialogs/quick-filters-dialog/quick-filters-dialog.component';
import { FilterTypeEnum } from '../../../../shared/models/filters/filter-type.enum';

@Component({
  selector: 'app-map-helper-bar',
  templateUrl: './map-helper-bar.component.html',
  styleUrls: ['./map-helper-bar.component.scss'],
})
export class MapHelperBarComponent {
  @Output() mapFiltersChanged = new EventEmitter<MapFilterModel[]>();
  showObjectFilters = false;
  showDeviceFilters = false;
  showRegionFilters = false;
  showStatusFilters = false;

  private dialogRef?: MatDialogRef<SimpleInputDialogComponent | QuickFiltersDialogComponent>;

  objectFilters$ = this.store.select(FiltersState.getMapObjectFilters);
  deviceFilters$ = this.store.select(FiltersState.getMapDeviceFilters);
  regionFilters$ = this.store.select(FiltersState.getMapRegionFilters);
  statusFilters$ = this.store.select(FiltersState.getMapStatusFilters);

  protected readonly FilterTypeEnum = FilterTypeEnum;

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
    this.loadForm(
      'Szukaj po atrybutach',
      model => {
        this.store.dispatch(new ChangeSearchFilters(model));
        this.mapFiltersChanged.emit();
      },
      this.store.selectSnapshot(FiltersState.getFilterAttributeModels)
    );
  }

  openQuickFilters(): void {
    this.dialogRef = this.dialog.open<QuickFiltersDialogComponent>(QuickFiltersDialogComponent, {
      data: {},
      width: '400px',
    });
  }

  private loadForm(
    formTitle: string,
    action: (model: FilterAttributeModel[]) => void,
    searchFilterModels?: FilterAttributeModel[]
  ) {
    const dataModel = getInputDialogDataModelForFilterAttributes(this.store, formTitle, action, searchFilterModels);

    this.dialogRef = this.dialog.open<SimpleInputDialogComponent>(SimpleInputDialogComponent, {
      data: <SimpleInputDialogDataModel>dataModel,
      width: '400px',
    });
  }

  onFiltersChanged() {
    this.mapFiltersChanged.emit();
  }
}
