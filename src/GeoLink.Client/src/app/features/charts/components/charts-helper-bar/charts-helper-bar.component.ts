import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { MapFilterModel } from '../../../maps/models/map-filter-model';
import { RoutePaths } from '../../../../core/modules/app-routing.module';
import { ChartsState } from '../../states/charts.state';
import { ChartOpenMode } from '../../models/open-mode.enum';
import { ApplyFilters, Load, SetOpenMode } from '../../states/charts.action';
import { SimpleInputDialogComponent } from '../../../../shared/components/dialogs/simple-input-dialog/simple-input-dialog.component';
import { FilterAttributeModel } from '../../../../shared/models/filters/filter-attribute.model';
import { getInputDialogDataModelForFilterAttributes } from '../../../../shared/helpers/filter-attributes.helper';
import { SimpleInputDialogDataModel } from '../../../../shared/components/dialogs/simple-input-dialog/simple-input-dialog-data.model';
import { FiltersState } from '../../../../shared/states/filters.state';
import { ChangeSearchFilters } from '../../../../shared/states/filter.action';
import { FilterTypeEnum } from 'src/app/shared/models/filters/filter-type.enum';
import { QuickFiltersDialogComponent } from '../../../../shared/components/dialogs/quick-filters-dialog/quick-filters-dialog.component';

@Component({
  selector: 'app-charts-helper-bar',
  templateUrl: './charts-helper-bar.component.html',
  styleUrls: ['./charts-helper-bar.component.scss'],
})
export class ChartsHelperBarComponent implements OnDestroy {
  openMode$: Observable<ChartOpenMode> = this.store.select(ChartsState.getOpenMode);
  clusterLabel$: Observable<string> = this.store.select(ChartsState.getClusterLabel);

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

  private destroy$ = new Subject<void>();

  protected readonly OpenMode = ChartOpenMode;
  protected readonly FilterTypeEnum = FilterTypeEnum;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    actions$: Actions
  ) {
    actions$.pipe(ofActionDispatched(ApplyFilters), debounceTime(300), takeUntil(this.destroy$)).subscribe(() => {
      store.dispatch(new Load());
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
        this.store.dispatch(new Load());
      },
      this.store.selectSnapshot(FiltersState.getFilterAttributeModels)
    );
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
    this.store.dispatch(new ApplyFilters());
  }

  removeClusterGroupFilter(): void {
    this.store.dispatch(new Navigate([RoutePaths.Charts]));
    this.store.dispatch(new SetOpenMode(ChartOpenMode.ForCustomSearch));
    this.store.dispatch(new Load());
  }

  openQuickFilters(): void {
    this.dialogRef = this.dialog.open<QuickFiltersDialogComponent>(QuickFiltersDialogComponent, {
      data: {},
      width: '400px',
    });
  }
}
