import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MapItemModel } from '../models/map-item.model';
import { MapObjectFiltersModel } from '../models/map-object-filter.model';
import { MapAreaFiltersModel } from '../models/map-area-filters.model';
import { DeviceStatusEnum } from '../models/device-status.enum';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

@Injectable()
export class MapsService extends RemoteServiceBase {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllObjects(): Observable<MapItemModel[]> {
    const mapItems: MapItemModel[] = [];

    for (let i = 0; i < 1000; i++) {
      mapItems.push({
        id: i,
        name: 'Router',
        status: this.randomEnum(DeviceStatusEnum),
        coordinates: {
          longitude: this.generatePolishLon(),
          latitude: this.generatePolishLat(),
        },
        groupItems: [
          {
            name: 'TELCO',
            deviceItems: [
              { name: 'Szafa', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] },
              { name: 'Router', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] },
              { name: 'Switch', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] },
              { name: 'Modem Tetra', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] },
              { name: 'Modem GSM', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] },
            ],
          },
          {
            name: 'POMIARY',
            deviceItems: [
              { name: 'Koncentrator', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] },
              { name: 'Licznik', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] },
            ],
          },
          {
            name: 'SCADA',
            deviceItems: [{ name: 'Sterownik', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] }],
          },
          {
            name: 'SIŁOWNIA',
            deviceItems: [
              { name: 'Zasilanie', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] },
              { name: 'UPS', status: this.randomEnum(DeviceStatusEnum), deviceItems: [] },
            ],
          },
        ],
      });
    }

    return of(mapItems);
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
