import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IMapsService } from './maps.service.base';
import { MapItemModel } from '../models/map-item.model';

@Injectable()
export class MapsService extends IMapsService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  getAllObjects(): Observable<MapItemModel[]> {
    const mapItems: MapItemModel[] = [];

    for (let i = 0; i < 1000; i++) {
      mapItems.push({
        id: i,
        name: 'Router',
        status: this.randomIntFromInterval(0, 2),
        coordinates: {
          longitude: this.generatePolishLon(),
          latitude: this.generatePolishLat(),
        },
      });
    }

    return of(mapItems);
  }

  private generatePolishLat() {
    return +(Math.random() * (54.79086 - 49.29899) + 49.29899).toFixed(5);
  }

  private generatePolishLon() {
    return +(Math.random() * (23.89251 - 14.24712) + 14.24712).toFixed(5);
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}