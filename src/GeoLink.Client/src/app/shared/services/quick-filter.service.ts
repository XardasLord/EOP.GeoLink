import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RemoteServiceBase } from './remote-service.base';
import { QuickFilterModel } from '../models/filters/quick-filter.model';

@Injectable()
export class QuickFilterService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getQuickFilters(): Observable<QuickFilterModel[]> {
    return this.httpClient.get<QuickFilterModel[]>(`${this.apiUrl}/filters/getFastFilters`);
  }

  save(model: QuickFilterModel): Observable<QuickFilterModel> {
    return this.httpClient.put<QuickFilterModel>(`${this.apiUrl}/filters/setFastFilters`, model);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/filters/delFastFilters/${id}`);
  }
}
