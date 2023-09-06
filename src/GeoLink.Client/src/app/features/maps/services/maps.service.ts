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
import { MapFilterModel } from '../models/map-filter-model';
import { GetClustersAndObjectsRequestModel } from '../models/http-request-models/get-clusters-and-objects-request.model';
import { GetObjectsRequestModel } from '../models/http-request-models/get-objects-request.model';
import { GetClusterInfoRequestModel } from '../models/http-request-models/get-cluster-info-request.model';

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
    zoomLevel: number,
    selectedObjectMapFilters: MapFilterModel[],
    selectedDeviceMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[]
  ): Observable<MapClusterObjectModel> {
    const requestModel: GetClustersAndObjectsRequestModel = {
      zoomLevel: zoomLevel,
      threshold: 20,
      bbox: {
        lonMin: lonMin,
        lonMax: lonMax,
        latMin: latMin,
        latMax: latMax,
      },
      objectFilters: selectedObjectMapFilters
        .filter(x => x.apiFilterType === 'ObjectTypeFilters' && x.id !== null)
        .map(x => x.id),
      deviceFilters: selectedDeviceMapFilters
        .filter(x => x.apiFilterType === 'DeviceFilters' && x.id !== null)
        .map(x => x.id),
      regionFilters: selectedRegionMapFilters
        .filter(x => x.apiFilterType === 'RegionFilters' && x.id !== null)
        .map(x => x.id),
      statusFilters: selectedStatusMapFilters
        .filter(x => x.apiFilterType === 'StatusFilters' && x.id !== null)
        .map(x => x.id),
      attributeFilters: [],
    };

    return this.httpClient.post<MapClusterObjectModel>(`${this.apiUrl}/map/getClustersAndObjects`, requestModel);
  }

  getObjects(
    lonMin: number, // SW
    latMin: number, // SW
    lonMax: number, // NE
    latMax: number, // NE
    selectedObjectMapFilters: MapFilterModel[],
    selectedDeviceMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[]
  ): Observable<MapObjectModel[]> {
    const requestModel: GetObjectsRequestModel = {
      bbox: {
        lonMin: lonMin,
        lonMax: lonMax,
        latMin: latMin,
        latMax: latMax,
      },
      objectFilters: selectedObjectMapFilters
        .filter(x => x.apiFilterType === 'ObjectTypeFilters' && x.id !== null)
        .map(x => x.id),
      deviceFilters: selectedDeviceMapFilters
        .filter(x => x.apiFilterType === 'DeviceFilters' && x.id !== null)
        .map(x => x.id),
      regionFilters: selectedRegionMapFilters
        .filter(x => x.apiFilterType === 'RegionFilters' && x.id !== null)
        .map(x => x.id),
      statusFilters: selectedStatusMapFilters
        .filter(x => x.apiFilterType === 'StatusFilters' && x.id !== null)
        .map(x => x.id),
      attributeFilters: [],
    };

    return this.httpClient.post<MapObjectModel[]>(`${this.apiUrl}/map/getObjects`, requestModel);
  }

  getDevices(deviceIds: number[]): Observable<DeviceDetailsModel[]> {
    let params = new HttpParams();
    for (let i = 0; i < deviceIds.length; i++) {
      params = params.append('deviceId', deviceIds[i].toString());
    }

    return this.httpClient.get<DeviceDetailsModel[]>(`${this.apiUrl}/map/getDevices`, { params: params });
  }

  getClusterInfo(
    idCluster: number,
    lvl: number,
    objType: MapObjectTypeEnum,
    selectedDeviceMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[]
  ): Observable<MapClusterGroupDetails> {
    const requestModel: GetClusterInfoRequestModel = {
      idCluster: idCluster,
      lvl: lvl,
      objType: objType,
      deviceFilters: selectedDeviceMapFilters
        .filter(x => x.apiFilterType === 'DeviceFilters' && x.id !== null)
        .map(x => x.id),
      regionFilters: selectedRegionMapFilters
        .filter(x => x.apiFilterType === 'RegionFilters' && x.id !== null)
        .map(x => x.id),
      statusFilters: selectedStatusMapFilters
        .filter(x => x.apiFilterType === 'StatusFilters' && x.id !== null)
        .map(x => x.id),
      attributeFilters: [],
    };

    return this.httpClient.post<MapClusterGroupDetails>(`${this.apiUrl}/map/getClusterInfo`, requestModel);
  }

  getFilters(): Observable<MapFilterModel[]> {
    return this.httpClient.get<MapFilterModel[]>(`${this.apiUrl}/interface/getFiltersDef`);
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
