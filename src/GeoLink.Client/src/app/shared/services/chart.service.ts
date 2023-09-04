import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RemoteServiceBase } from './remote-service.base';
import { ChartModel } from '../models/charts/chart.model';
import { ChartTypeEnum } from '../models/charts/chart-type.enum';
import { MapFilterModel } from '../../features/maps/models/map-filter-model';

@Injectable()
export class ChartService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getDeviceChart(
    deviceId: number,
    chartType: ChartTypeEnum,
    timeExtent = 1,
    intervalMinutes = 30,
    dateEnd: Date | undefined = undefined
  ): Observable<ChartModel> {
    let params = new HttpParams()
      .set('deviceId', deviceId)
      .set('timeExtent', timeExtent) // Okno czasowe (wartość słownikowa)
      .set('intervalMinutes', intervalMinutes) // Interwał (min) między odczytami, wpływających na zagęszczenie szeregu czasowego
      .set('chartTypes', chartType);

    if (dateEnd) {
      params = params.append('dateEnd', dateEnd.toDateString()); // [opcjonalne] data końcowa, domyślnie SYSDATE. Od niej odejmowane są kolejne interwały, aż do wypełnienia okna czasowego. Może się przydać, jeśli wykresy będzie można np przewijać
    }

    return this.httpClient.get<ChartModel>(`${this.apiUrl}/charts/getDeviceCharts`, { params });
  }

  getSystemChart(systemId: number): Observable<ChartModel> {
    const params = new HttpParams().set('systemId', systemId);

    return this.httpClient.get<ChartModel>(`${this.apiUrl}/charts/getSystemCharts`, { params });
  }

  getChart(
    timeExtent = 1,
    chartType: ChartTypeEnum,
    selectedObjectMapFilters: MapFilterModel[],
    selectedDeviceMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[],
    selectedIpMapFilters: MapFilterModel[],
    clusterLevel: number | null = null,
    idCluster: number | null = null
  ): Observable<ChartModel> {
    let params = new HttpParams().set('timeExtent', timeExtent).set('chartTypes', chartType);

    if (clusterLevel && idCluster) {
      params = params.set('lvl', clusterLevel).set('idCluster', idCluster);
    }

    params = this.setFilters(
      params,
      selectedObjectMapFilters,
      selectedDeviceMapFilters,
      selectedRegionMapFilters,
      selectedStatusMapFilters,
      selectedIpMapFilters
    );

    return this.httpClient.get<ChartModel>(`${this.apiUrl}/charts/getCharts`, { params });
  }

  private setFilters(
    httpParams: HttpParams,
    selectedObjectMapFilters: MapFilterModel[],
    selectedDeviceMapFilters: MapFilterModel[],
    selectedRegionMapFilters: MapFilterModel[],
    selectedStatusMapFilters: MapFilterModel[],
    selectedIpMapFilters: MapFilterModel[]
  ): HttpParams {
    selectedObjectMapFilters
      .filter(x => x.apiFilterType === 'ObjectTypeFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('objectTypeFilters', filter.id);
      });

    selectedDeviceMapFilters
      .filter(x => x.apiFilterType === 'DeviceFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('deviceFilters', filter.id);
      });

    selectedRegionMapFilters
      .filter(x => x.apiFilterType === 'RegionFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('regionFilters', filter.id);
      });

    selectedStatusMapFilters
      .filter(x => x.apiFilterType === 'StatusFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('statusFilters', filter.id);
      });

    selectedIpMapFilters
      .filter(x => x.apiFilterType === 'IpFilters' && x.id !== null)
      .forEach(filter => {
        httpParams = httpParams.append('ipFilters', filter.id);
      });

    return httpParams;
  }
}
