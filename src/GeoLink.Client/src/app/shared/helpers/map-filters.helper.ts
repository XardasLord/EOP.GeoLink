import { MapFilterModel } from '../../features/maps/models/map-filter-model';

export function getAllSelectedFilters(filters: MapFilterModel[]): MapFilterModel[] {
  let completedFilters: MapFilterModel[] = [];

  filters.forEach(filter => {
    if (filter.completed === true) {
      completedFilters.push(filter);
    }

    if (filter.filters && filter.filters.length > 0) {
      const childFilters = getAllSelectedFilters(filter.filters);
      completedFilters = completedFilters.concat(childFilters);
    }
  });

  return completedFilters;
}
