import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MapClusterObjectModel, MapObjectModel } from '../models/map-item.model';
import { MapObjectFiltersModel } from '../models/map-object-filter.model';
import { MapAreaFiltersModel } from '../models/map-area-filters.model';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';
import { environment } from '../../../../environments/environment';

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

  getObjectFilters(): Observable<MapObjectFiltersModel[]> {
    const objectFilters: MapObjectFiltersModel[] = [
      {
        name: 'LINIE ENERGETYCZNE',
        completed: false,
        allNestedFiltersCompleted: false,
        nestedFilters: [
          { name: 'Linie WN', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Linie SN', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Linie NN', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
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
          { name: 'Szafa GPZ/PZ', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Szafa AMI/SG', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
        ],
      },
      {
        name: 'SIECI TAN',
        completed: false,
        allNestedFiltersCompleted: false,
        nestedFilters: [
          { name: 'TAN A', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'TAN B', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'TETRA', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Modemy', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Switch', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
        ],
      },
      {
        name: 'SCADA',
        completed: false,
        allNestedFiltersCompleted: false,
        nestedFilters: [
          { name: 'Sterownik TAN A', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Sterownik 1N', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Sterownik 2W', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Sterownik GSM', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
        ],
      },
      {
        name: 'POMIARY',
        completed: false,
        allNestedFiltersCompleted: false,
        nestedFilters: [
          { name: 'ZKB', completed: false, allNestedFiltersCompleted: false },
          { name: 'Licznik GSM taryfa A', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Licznik GSM taryfa B', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Licznik GSM taryfa C', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Licznik GSM taryfa D', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
        ],
      },
    ];

    return of(objectFilters);
  }

  getAreaFilters(): Observable<MapAreaFiltersModel[]> {
    const areaFilters: MapAreaFiltersModel[] = [
      {
        name: 'CENTRALA',
        completed: false,
        allNestedFiltersCompleted: false,
        nestedFilters: [
          {
            name: 'Oddział Gdańsk',
            completed: false,
            allNestedFiltersCompleted: false,
            nestedFilters: [
              { name: 'Rejon Gdańsk', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
              { name: 'Rejon Gdynia', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
              { name: 'Rejon Kartuzy', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
              { name: 'Rejon Starogard Gd.', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
              { name: 'Rejon Tczew', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
              { name: 'Rejon Wejcherowo', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
            ],
          },
          { name: 'Oddział Kalisz', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Oddział Koszalin', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Oddział Olsztyn', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Oddział Płock', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
          { name: 'Oddział Toruń', completed: false, allNestedFiltersCompleted: false, nestedFilters: [] },
        ],
      },
    ];

    return of(areaFilters);
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
