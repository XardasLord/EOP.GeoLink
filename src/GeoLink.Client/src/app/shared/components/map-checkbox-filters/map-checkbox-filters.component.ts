import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapFilterModel } from '../../../features/maps/models/map-filter-model';
import { ToggleMapFilter } from '../../states/filter.action';
import { FiltersState } from '../../states/filters.state';
import { FilterTypeEnum } from '../../models/filters/filter-type.enum';

@Component({
  selector: 'app-map-checkbox-filters',
  templateUrl: './map-checkbox-filters.component.html',
  styleUrls: ['./map-checkbox-filters.component.scss'],
})
export class MapCheckboxFiltersComponent {
  @Input() filter!: MapFilterModel;
  @Input() filterType!: FilterTypeEnum;
  @Output() filtersChanged = new EventEmitter<MapFilterModel[]>();

  constructor(private store: Store) {}

  toggleFilter() {
    const newCompletedState = !this.filter.completed;
    this.store.dispatch(new ToggleMapFilter(this.filter.idFilter!, this.filterType, newCompletedState));

    // Dodajemy obsługę zaznaczania/odznaczania dzieci
    if (this.filter.filters && this.filter.filters.length) {
      this.filter.filters.forEach(childFilter => {
        this.store.dispatch(new ToggleMapFilter(childFilter.idFilter!, this.filterType, newCompletedState));
        this.toggleChildren(childFilter, newCompletedState);
      });
    }

    // Dodajemy obsługę zaznaczania/odznaczania rodziców (jeśli rodzic jest w innej grupie rodziców)
    if (this.filter.parentId) {
      this.store.dispatch(new ToggleMapFilter(this.filter.parentId, this.filterType, newCompletedState));

      // Tutaj rekurencyjnie obsługujemy rodziców (jeśli są zagnieżdżeni)
      this.toggleParent(this.filter.parentId, newCompletedState);
    }

    this.onFiltersChanged();
  }

  private toggleChildren(filter: MapFilterModel, completed: boolean) {
    if (filter.filters && filter.filters.length) {
      filter.filters.forEach(childFilter => {
        this.store.dispatch(new ToggleMapFilter(childFilter.idFilter!, this.filterType, completed));
        this.toggleChildren(childFilter, completed);
      });
    }
  }

  private toggleParent(parentId: number, completed: boolean) {
    let parent = null;

    if (this.filterType === FilterTypeEnum.Object) {
      parent = this.store.selectSnapshot(FiltersState.getMapObjectFilters).find(x => x.parentId === parentId);
    } else if (this.filterType === FilterTypeEnum.Device) {
      parent = this.store.selectSnapshot(FiltersState.getMapDeviceFilters).find(x => x.parentId === parentId);
    } else if (this.filterType === FilterTypeEnum.Region) {
      parent = this.store.selectSnapshot(FiltersState.getMapRegionFilters).find(x => x.parentId === parentId);
    } else if (this.filterType === FilterTypeEnum.Status) {
      parent = this.store.selectSnapshot(FiltersState.getMapStatusFilters).find(x => x.parentId === parentId);
    }

    if (parent && parent.parentId) {
      this.store.dispatch(new ToggleMapFilter(parentId, this.filterType, completed));
      this.toggleParent(parent.parentId, completed);
    }
  }

  onFiltersChanged() {
    this.filtersChanged.emit();
  }

  isIndeterminate(filter: MapFilterModel): boolean {
    if (!filter.filters || filter.filters.length === 0) {
      return false;
    }

    const hasChecked = filter.filters.some(childFilter => childFilter.completed);
    const hasUnchecked = filter.filters.some(childFilter => !childFilter.completed);

    if (hasChecked && hasUnchecked) {
      return true; // Stan indeterminate, jeśli są zarówno zaznaczone, jak i niezaznaczone dzieci
    }

    // Rekurencyjnie sprawdź indeterminate dla dzieci
    return filter.filters.some(childFilter => this.isIndeterminate(childFilter));
  }
}
