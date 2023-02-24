import { Component } from '@angular/core';
import { MapsState } from '../../../features/maps/states/maps.state';
import { Store } from '@ngxs/store';
import { MapObjectFiltersModel } from '../../../features/maps/models/map-object-filter.model';

@Component({
  selector: 'app-map-area-filters',
  templateUrl: './map-area-filters.component.html',
  styleUrls: ['./map-area-filters.component.scss'],
})
export class MapAreaFiltersComponent {
  mapFilters$ = this.store.select(MapsState.getMapFilters);

  constructor(private store: Store) {}

  updateAllComplete(parent: MapObjectFiltersModel) {
    parent.allNestedFiltersCompleted = parent.nestedFilters != null && parent.nestedFilters.every(t => t.completed);
  }

  someComplete(model: MapObjectFiltersModel): boolean {
    if (model.nestedFilters == null) {
      return false;
    }

    return model.nestedFilters.filter(t => t.completed).length > 0 && !model.allNestedFiltersCompleted;
  }

  setAll(completed: boolean, model: MapObjectFiltersModel) {
    model.allNestedFiltersCompleted = completed;

    if (model.nestedFilters == null) {
      return;
    }

    model.nestedFilters.forEach(filter => {
      filter.completed = completed;

      this.setAll(completed, filter);
    });
  }
}
