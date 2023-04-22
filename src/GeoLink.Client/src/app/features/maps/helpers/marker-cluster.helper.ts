import { Marker } from 'leaflet';
import { MapClusterModel } from '../models/map-item.model';

export class MarkerClusterHelper {
  public static getCssClassForClusterGroup(mapClusterModel: MapClusterModel): string {
    let css = '';

    const goodStatuses = sumStCountForStatus(mapClusterModel, 1);

    const warningStatuses = sumStCountForStatus(mapClusterModel, 2);

    const badStatuses = sumStCountForStatus(mapClusterModel, 3);

    const cssPrefix = 'marker-cluster-base marker-cluster';

    if (goodStatuses > 0 && warningStatuses === 0 && badStatuses === 0) {
      css = `${cssPrefix}-good-100`;
    } else if (goodStatuses === 0 && warningStatuses > 0 && badStatuses === 0) {
      css = `${cssPrefix}-warning-100`;
    } else if (goodStatuses === 0 && warningStatuses === 0 && badStatuses > 0) {
      css = `${cssPrefix}-bad-100`;
    } else if (goodStatuses > 0 && warningStatuses > 0 && badStatuses === 0 && goodStatuses > warningStatuses) {
      css = `${cssPrefix}-good-75-warning-25`;
    } else if (goodStatuses > 0 && warningStatuses > 0 && badStatuses === 0 && goodStatuses === warningStatuses) {
      css = `${cssPrefix}-good-50-warning-50`;
    } else if (goodStatuses > 0 && warningStatuses > 0 && badStatuses === 0 && goodStatuses < warningStatuses) {
      css = `${cssPrefix}-good-25-warning-75`;
    } else if (goodStatuses > 0 && warningStatuses === 0 && badStatuses > 0 && goodStatuses > badStatuses) {
      css = `${cssPrefix}-good-75-bad-25`;
    } else if (goodStatuses > 0 && warningStatuses === 0 && badStatuses > 0 && goodStatuses === badStatuses) {
      css = `${cssPrefix}-good-50-bad-50`;
    } else if (goodStatuses > 0 && warningStatuses === 0 && badStatuses > 0 && goodStatuses < badStatuses) {
      css = `${cssPrefix}-good-25-bad-75`;
    } else if (goodStatuses === 0 && warningStatuses > 0 && badStatuses > 0 && warningStatuses > badStatuses) {
      css = `${cssPrefix}-warning-75-bad-25`;
    } else if (goodStatuses === 0 && warningStatuses > 0 && badStatuses > 0 && warningStatuses === badStatuses) {
      css = `${cssPrefix}-warning-50-bad-50`;
    } else if (goodStatuses === 0 && warningStatuses > 0 && badStatuses > 0 && warningStatuses < badStatuses) {
      css = `${cssPrefix}-warning-25-bad-75`;
    } else if (
      goodStatuses > 0 &&
      warningStatuses > 0 &&
      badStatuses > 0 &&
      ((goodStatuses > warningStatuses && goodStatuses > badStatuses) ||
        (goodStatuses > warningStatuses && warningStatuses === badStatuses))
    ) {
      css = `${cssPrefix}-good-50-warning-25-bad-25`;
    } else if (
      goodStatuses > 0 &&
      warningStatuses > 0 &&
      badStatuses > 0 &&
      goodStatuses === warningStatuses &&
      goodStatuses === badStatuses
    ) {
      css = `${cssPrefix}-good-33-warning-33-bad-33`;
    } else if (
      goodStatuses > 0 &&
      warningStatuses > 0 &&
      badStatuses > 0 &&
      ((warningStatuses > badStatuses && warningStatuses > goodStatuses) ||
        (warningStatuses > badStatuses && badStatuses === goodStatuses) ||
        (warningStatuses === goodStatuses && warningStatuses > badStatuses))
    ) {
      css = `${cssPrefix}-good-25-warning-50-bad-25`;
    } else if (
      goodStatuses > 0 &&
      warningStatuses > 0 &&
      badStatuses > 0 &&
      ((badStatuses > warningStatuses && badStatuses > goodStatuses) ||
        (badStatuses > warningStatuses && goodStatuses === warningStatuses) ||
        (badStatuses === warningStatuses && badStatuses > goodStatuses) ||
        (badStatuses === goodStatuses && badStatuses > warningStatuses))
    ) {
      css = `${cssPrefix}-good-25-warning-25-bad-50`;
    }

    if (css === '') {
      console.warn('Missing CSS for the case: ', goodStatuses, warningStatuses, badStatuses);
    }

    return css;

    function sumStCountForStatus(cluster: MapClusterModel, statusToCount: number): number {
      let sum = 0;
      for (const objectGroup of cluster.objectGroups) {
        for (const devStat of objectGroup.devStat) {
          if (devStat.idStat === statusToCount) {
            sum += devStat.stCount;
          }
        }
      }

      return sum;
    }
  }
}
