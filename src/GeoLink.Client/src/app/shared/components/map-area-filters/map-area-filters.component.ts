import { Component, EventEmitter, Output } from '@angular/core';
import { MapsState } from '../../../features/maps/states/maps.state';
import { Store } from '@ngxs/store';
import { MapObjectFiltersModel } from '../../../features/maps/models/map-object-filter.model';
import { MapAreaFiltersModel } from '../../../features/maps/models/map-area-filters.model';
import { filter, map, mergeMap, Observable, of } from 'rxjs';

@Component({
  selector: 'app-map-area-filters',
  templateUrl: './map-area-filters.component.html',
  styleUrls: ['./map-area-filters.component.scss'],
})
export class MapAreaFiltersComponent {
  @Output() filtersChanged = new EventEmitter<string[]>();
  mapFilters$ = this.store.select(MapsState.getMapFilters);

  constructor(private store: Store) {}

  updateAllComplete(parent: MapObjectFiltersModel) {
    // this.getAllSelectedFilters().subscribe(filters => {
    //   this.filtersChanged.emit(filters);
    // })
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

  private getAllSelectedFilters(): Observable<string[]> {
    return this.mapFilters$.pipe(
      // Użyj operatora filter(), aby przefiltrować elementy, gdzie wartość `completed` w `areaFilters` jest ustawiona na `true`.
      filter(filters => filters.areaFilters.some(areaFilter => areaFilter.completed)),
      // Użyj operatora map(), aby zamienić elementy na ich właściwość `name`.
      map(filters => filters.areaFilters.filter(areaFilter => areaFilter.completed).map(areaFilter => areaFilter.name))
    );
  }
}
