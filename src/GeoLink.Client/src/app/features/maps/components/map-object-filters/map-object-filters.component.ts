import { Component } from '@angular/core';
import { MapObjectFiltersModel } from '../../models/map-object-filter.model';

@Component({
  selector: 'app-map-object-filters',
  templateUrl: './map-object-filters.component.html',
  styleUrls: ['./map-object-filters.component.scss'],
})
export class MapObjectFiltersComponent {
  objectFilters: MapObjectFiltersModel[] = [
    {
      name: 'LINIE ENERGETYCZNE',
      completed: false,
      allNestedFiltersCompleted: false,
      nestedFilters: [
        { name: 'Linie WN', completed: false, allNestedFiltersCompleted: false },
        { name: 'Linie SN', completed: false, allNestedFiltersCompleted: false },
        { name: 'Linie NN', completed: false, allNestedFiltersCompleted: false },
      ],
    },
    {
      name: 'GPZ',
      completed: false,
      allNestedFiltersCompleted: false,
      nestedFilters: [],
    },
    {
      name: 'STACJE SN',
      completed: false,
      allNestedFiltersCompleted: false,
      nestedFilters: [
        { name: 'Szafa GPZ/PZ', completed: false, allNestedFiltersCompleted: false },
        { name: 'Szafa AMI/SG', completed: false, allNestedFiltersCompleted: false },
      ],
    },
  ];

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

    model.nestedFilters.forEach(t => (t.completed = completed));
  }
}
