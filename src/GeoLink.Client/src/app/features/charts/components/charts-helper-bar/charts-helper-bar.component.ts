import { Component, EventEmitter, Output } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MapFilterModel } from '../../../maps/models/map-filter-model';
import { RoutePaths } from '../../../../core/modules/app-routing.module';
import { ChartsState } from '../../states/charts.state';
import { ChartOpenMode } from '../../models/open-mode.enum';
import { Load, SetOpenMode } from '../../states/charts.action';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SimpleInputDialogComponent } from '../../../../shared/components/dialogs/simple-input-dialog/simple-input-dialog.component';
import { FilterAttributeModel } from '../../../../shared/models/filters/filter-attribute.model';
import { getInputDialogDataModelForFilterAttributes } from '../../../../shared/helpers/filter-attributes.helper';
import { SimpleInputDialogDataModel } from '../../../../shared/components/dialogs/simple-input-dialog/simple-input-dialog-data.model';
import { FiltersState } from '../../../../shared/states/filters.state';
import { ChangeSearchFilters } from '../../../../shared/states/filter.action';

@Component({
  selector: 'app-charts-helper-bar',
  templateUrl: './charts-helper-bar.component.html',
  styleUrls: ['./charts-helper-bar.component.scss'],
})
export class ChartsHelperBarComponent {
  openMode$: Observable<ChartOpenMode> = this.store.select(ChartsState.getOpenMode);
  clusterLabel$: Observable<string> = this.store.select(ChartsState.getClusterLabel);

  @Output() mapFiltersChanged = new EventEmitter<MapFilterModel[]>();
  showObjectFilters = false;
  showDeviceFilters = false;
  showRegionFilters = false;
  showStatusFilters = false;

  dialogRef?: MatDialogRef<SimpleInputDialogComponent>;

  protected readonly OpenMode = ChartOpenMode;

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

  onFiltersChanged($event: MapFilterModel[]) {
    this.mapFiltersChanged.emit($event);
    this.store.dispatch(new Load());
  }

  removeClusterGroupFilter(): void {
    this.store.dispatch(new Navigate([RoutePaths.Charts]));
    this.store.dispatch(new SetOpenMode(ChartOpenMode.ForCustomSearch));
    this.store.dispatch(new Load());
  }
}
