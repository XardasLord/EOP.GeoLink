import { Marker } from 'leaflet';
import { MapItemModel } from '../models/map-item.model';

export class MarkerClusterHelper {
  public static getCssClassForClusterGroup(childMarkers: Marker<MapItemModel>[]): string {
    let css = '';

    const goodStatuses = childMarkers.filter(
      x => (JSON.parse((x as any).deviceData) as MapItemModel).status === 2
    ).length;

    const warningStatuses = childMarkers.filter(
      x => (JSON.parse((x as any).deviceData) as MapItemModel).status === 1
    ).length;

    const badStatuses = childMarkers.filter(
      x => (JSON.parse((x as any).deviceData) as MapItemModel).status === 0
    ).length;

    if (goodStatuses > 0 && warningStatuses === 0 && badStatuses === 0) {
      css = 'good-100';
    } else if (goodStatuses === 0 && warningStatuses > 0 && badStatuses === 0) {
      css = 'warning-100';
    } else if (goodStatuses === 0 && warningStatuses === 0 && badStatuses > 0) {
      css = 'bad-100';
    } else if (goodStatuses > 0 && warningStatuses > 0 && badStatuses === 0 && goodStatuses > warningStatuses) {
      css = 'good-75-warning-25';
    } else if (goodStatuses > 0 && warningStatuses > 0 && badStatuses === 0 && goodStatuses === warningStatuses) {
      css = 'good-50-warning-50';
    } else if (goodStatuses > 0 && warningStatuses > 0 && badStatuses === 0 && goodStatuses < warningStatuses) {
      css = 'good-25-warning-75';
    } else if (goodStatuses > 0 && warningStatuses === 0 && badStatuses > 0 && goodStatuses > badStatuses) {
      css = 'good-75-bad-25';
    } else if (goodStatuses > 0 && warningStatuses === 0 && badStatuses > 0 && goodStatuses === badStatuses) {
      css = 'good-50-bad-50';
    } else if (goodStatuses > 0 && warningStatuses === 0 && badStatuses > 0 && goodStatuses < badStatuses) {
      css = 'good-25-bad-75';
    } else if (goodStatuses === 0 && warningStatuses > 0 && badStatuses > 0 && warningStatuses > badStatuses) {
      css = 'warning-75-bad-25';
    } else if (goodStatuses === 0 && warningStatuses > 0 && badStatuses > 0 && warningStatuses === badStatuses) {
      css = 'warning-50-bad-50';
    } else if (goodStatuses === 0 && warningStatuses > 0 && badStatuses > 0 && warningStatuses < badStatuses) {
      css = 'warning-25-bad-75';
    } else if (
      goodStatuses > 0 &&
      warningStatuses > 0 &&
      badStatuses > 0 &&
      ((goodStatuses > warningStatuses && goodStatuses > badStatuses) ||
        (goodStatuses > warningStatuses && warningStatuses === badStatuses))
    ) {
      css = 'good-50-warning-25-bad-25';
    } else if (
      goodStatuses > 0 &&
      warningStatuses > 0 &&
      badStatuses > 0 &&
      goodStatuses === warningStatuses &&
      goodStatuses === badStatuses
    ) {
      css = 'good-33-warning-33-bad-33';
    } else if (
      goodStatuses > 0 &&
      warningStatuses > 0 &&
      badStatuses > 0 &&
      ((warningStatuses > badStatuses && warningStatuses > goodStatuses) ||
        (warningStatuses > badStatuses && badStatuses === goodStatuses) ||
        (warningStatuses === goodStatuses && warningStatuses > badStatuses))
    ) {
      css = 'good-25-warning-50-bad-25';
    } else if (
      goodStatuses > 0 &&
      warningStatuses > 0 &&
      badStatuses > 0 &&
      ((badStatuses > warningStatuses && badStatuses > goodStatuses) ||
        (badStatuses > warningStatuses && goodStatuses === warningStatuses) ||
        (badStatuses === warningStatuses && badStatuses > goodStatuses) ||
        (badStatuses === goodStatuses && badStatuses > warningStatuses))
    ) {
      css = 'good-25-warning-25-bad-50';
    }

    if (css === '') {
      console.warn('Missing CSS for the case: ', goodStatuses, warningStatuses, badStatuses);
    }

    return css;
  }

  public static getMapItemModels(markers: Marker<MapItemModel>[]): MapItemModel[] {
    const mapItems: MapItemModel[] = [];

    markers.forEach(marker => {
      mapItems.push(JSON.parse((marker as any).deviceData));
    });

    return mapItems;
  }
  public static getMapItemModel(marker: Marker<MapItemModel>): MapItemModel {
    const mapItem: MapItemModel = JSON.parse((marker as any).deviceData);

    return mapItem;
  }
}
