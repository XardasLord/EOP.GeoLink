import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapsState } from '../../../features/maps/states/maps.state';
import { MapFilterModel } from '../../../features/maps/models/map-filter-model';
import { MapFiltersModel } from '../../../features/maps/models/map-filters.model';

@Component({
  selector: 'app-map-region-filters',
  templateUrl: './map-region-filters.component.html',
  styleUrls: ['./map-region-filters.component.scss'],
})
export class MapRegionFiltersComponent {
  @Output() filtersChanged = new EventEmitter<string[]>();

  private readonly mapOriginalFilters: MapFiltersModel;

  mapFilters: MapFiltersModel;

  constructor(private store: Store) {
    this.mapOriginalFilters = this.store.selectSnapshot(MapsState.getMapFilters);
    this.mapFilters = JSON.parse(JSON.stringify(this.mapOriginalFilters));
  }

  updateAllComplete(parent: MapFilterModel) {
    // this.getAllSelectedFilters().subscribe(filters => {
    //   this.filtersChanged.emit(filters);
    // })
    console.warn(parent);
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

  // private getAllSelectedFilters(): Observable<string[]> {
  //   return this.mapFilters$.pipe(
  //     // Użyj operatora filter(), aby przefiltrować elementy, gdzie wartość `completed` w `areaFilters` jest ustawiona na `true`.
  //     filter(filters => filters.areaFilters.some(areaFilter => areaFilter.completed)),
  //     // Użyj operatora map(), aby zamienić elementy na ich właściwość `name`.
  //     map(filters => filters.areaFilters.filter(areaFilter => areaFilter.completed).map(areaFilter => areaFilter))
  //   );
  // }
}
