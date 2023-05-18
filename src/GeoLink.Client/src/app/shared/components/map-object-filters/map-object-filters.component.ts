import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapsState } from '../../../features/maps/states/maps.state';
import { MapFilterModel } from '../../../features/maps/models/map-filter-model';
import { MapFiltersModel } from '../../../features/maps/models/map-filters.model';

@Component({
  selector: 'app-map-object-filters',
  templateUrl: './map-object-filters.component.html',
  styleUrls: ['./map-object-filters.component.scss'],
})
export class MapObjectFiltersComponent {
  private readonly mapOriginalFilters: MapFiltersModel;
  mapFilters: MapFiltersModel;

  constructor(private store: Store) {
    this.mapOriginalFilters = this.store.selectSnapshot(MapsState.getMapFilters);
    this.mapFilters = JSON.parse(JSON.stringify(this.mapOriginalFilters));
  }

  updateAllComplete(parent: MapFilterModel) {
    parent.allChildFiltersCompleted = parent.filters != null && parent.filters.every(t => t.completed);
  }

  someComplete(model: MapFilterModel): boolean {
    if (model.filters == null) {
      return false;
    }

    return model.filters.filter(t => t.completed).length > 0 && !model.allChildFiltersCompleted;
  }

  setAll(completed: boolean, model: MapFilterModel) {
    model.allChildFiltersCompleted = completed;

    if (model.filters == null) {
      return;
    }

    model.filters.forEach(filter => {
      filter.completed = completed;

      this.setAll(completed, filter);
    });
  }
}
