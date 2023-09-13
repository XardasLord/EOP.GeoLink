import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RemoteServiceBase } from './remote-service.base';
import { QuickFiltersModel } from '../models/filters/quick-filters.model';

@Injectable()
export class QuickFilterService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getQuickFilters(): Observable<QuickFiltersModel[]> {
    return this.httpClient.get<QuickFiltersModel[]>(`${this.apiUrl}/filters/getFastFilters`);
  }
}
