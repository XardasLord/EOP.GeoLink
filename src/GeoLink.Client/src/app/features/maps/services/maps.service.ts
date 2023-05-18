import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DeviceDetailsModel,
  MapClusterGroupDetails,
  MapClusterObjectModel,
  MapObjectModel,
} from '../models/map-item.model';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';
import { MapObjectTypeEnum } from '../../../shared/models/map-object-type.enum';
import { MapFiltersModel } from '../models/map-filters.model';

@Injectable()
export class MapsService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getClustersAndObjects(
    lonMin: number, // SW
    latMin: number, // SW
    lonMax: number, // NE
    latMax: number, // NE
    zoomLevel: number
  ): Observable<MapClusterObjectModel> {
    const params = new HttpParams()
      .set('lonMin', lonMin)
      .set('latMin', latMin)
      .set('lonMax', lonMax)
      .set('latMax', latMax)
      .set('zoomLevel', zoomLevel)
      .set('clustObjThreshold', 2);

    return this.httpClient.get<MapClusterObjectModel>(`${this.apiUrl}/map/getClustersAndObjects`, { params: params });
  }

  getObjects(
    lonMin: number, // SW
    latMin: number, // SW
    lonMax: number, // NE
    latMax: number // NE
  ): Observable<MapObjectModel[]> {
    const params = new HttpParams()
      .set('lonMin', lonMin)
      .set('latMin', latMin)
      .set('lonMax', lonMax)
      .set('latMax', latMax);

    return this.httpClient.get<MapObjectModel[]>(`${this.apiUrl}/map/getObjects`, { params: params });
  }

  getDevices(deviceIds: number[]): Observable<DeviceDetailsModel[]> {
    let params = new HttpParams();
    for (let i = 0; i < deviceIds.length; i++) {
      params = params.append('deviceId', deviceIds[i].toString());
    }

    return this.httpClient.get<DeviceDetailsModel[]>(`${this.apiUrl}/map/getDevices`, { params: params });
  }

  getClusterInfo(clustId: number, lvl: number, objType: MapObjectTypeEnum): Observable<MapClusterGroupDetails> {
    const params = new HttpParams().set('clustId', clustId).set('lvl', lvl).set('objType', +objType);

    return this.httpClient.get<MapClusterGroupDetails>(`${this.apiUrl}/map/getClusterInfo`, { params: params });
  }

  getFilters(): Observable<MapFiltersModel> {
    return this.httpClient.get<MapFiltersModel>(`${this.apiUrl}/interface/getFilters`);
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

  private randomEnum<T>(enumValue: T): T[keyof T] {
    const enumValues = Object.keys(enumValue!)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }
}
