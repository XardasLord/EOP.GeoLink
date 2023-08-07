import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RemoteServiceBase } from './remote-service.base';
import { DeviceChartModel } from '../models/charts/device-chart.model';
import { ChartTypeEnum } from '../models/charts/chart-type.enum';

@Injectable()
export class DeviceChartService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getChart(
    deviceId: number,
    chartType: ChartTypeEnum,
    timeExtent = 0,
    intervalMinutes = 30,
    dateEnd: Date | undefined = undefined
  ): Observable<DeviceChartModel> {
    let params = new HttpParams()
      .set('deviceId', deviceId)
      .set('timeExtent', timeExtent) // Okno czasowe (wartość słownikowa)
      .set('intervalMinutes', intervalMinutes) // Interwał (min) między odczytami, wpływających na zagęszczenie szeregu czasowego
      .set('chartTypes', chartType);

    if (dateEnd) {
      params = params.append('dateEnd', dateEnd.toDateString()); // [opcjonalne] data końcowa, domyślnie SYSDATE. Od niej odejmowane są kolejne interwały, aż do wypełnienia okna czasowego. Może się przydać, jeśli wykresy będzie można np przewijać
    }

    return this.httpClient.get<DeviceChartModel>(`${this.apiUrl}/charts/getDeviceCharts`, { params });
  }
}
