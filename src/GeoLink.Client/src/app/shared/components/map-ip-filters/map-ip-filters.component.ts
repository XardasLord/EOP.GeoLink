import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapsState } from '../../../features/maps/states/maps.state';
import { MapFilterModel } from '../../../features/maps/models/map-filter-model';
import { MapFiltersModel } from '../../../features/maps/models/map-filters.model';
import { getAllSelectedFilters } from '../../helpers/map-filters.helper';
import { IpMapFiltersSelectionChange } from '../../../features/maps/states/maps.action';

@Component({
  selector: 'app-map-ip-filters',
  templateUrl: './map-ip-filters.component.html',
  styleUrls: ['./map-ip-filters.component.scss'],
})
export class MapIpFiltersComponent {
  @Output() filtersChanged = new EventEmitter<MapFilterModel[]>();

  private readonly mapOriginalFilters: MapFiltersModel;

  mapFilters: MapFiltersModel;

  constructor(private store: Store) {
    this.mapOriginalFilters = this.store.selectSnapshot(MapsState.getMapFilters);
    this.mapFilters = JSON.parse(JSON.stringify(this.mapOriginalFilters));
  }

  updateAllComplete(parent: MapFilterModel) {
    parent.allChildFiltersCompleted = parent.filters != null && parent.filters.every(t => t.completed);

    this.notifyFiltersChange();
  }

  someComplete(model: MapFilterModel): boolean {
    if (model.filters == null) {
      return false;
    }

    return model.filters.filter(t => t.completed).length > 0 && !model.allChildFiltersCompleted;
  }

  setAll(completed: boolean, parent: MapFilterModel) {
    parent.allChildFiltersCompleted = completed;
    parent.completed = completed;

    if (parent.filters == null) {
      this.notifyFiltersChange();

      return;
    }

    parent.filters
      .filter(x => x.enabled)
      .forEach(filter => {
        filter.completed = completed;

        this.setAll(completed, filter);
      });

    this.notifyFiltersChange();
  }

  private notifyFiltersChange() {
    const completedFilters = getAllSelectedFilters(this.mapFilters.ipFilters.flatMap(ipFilter => ipFilter.filters));

    this.store.dispatch(new IpMapFiltersSelectionChange(JSON.parse(JSON.stringify(completedFilters))));
    this.filtersChanged.emit(completedFilters);
  }
}