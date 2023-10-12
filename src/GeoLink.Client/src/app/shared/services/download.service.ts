import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RemoteServiceBase } from './remote-service.base';
import { environment } from '../../../environments/environment';

@Injectable()
export class DownloadService extends RemoteServiceBase {
  private apiUrl = environment.apiEndpoint;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getFile(data: Blob, name: string): void {
    const dataType = data.type;
    const binaryData = [];
    binaryData.push(data);

    const fileURL = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    const tempLink = document.createElement('a');
    tempLink.href = fileURL;
    tempLink.setAttribute('download', `${name}`);
    tempLink.dispatchEvent(new MouseEvent(`click`));
  }

  public downloadFileFromApi(uri: string, httpParams?: HttpParams): Observable<HttpResponse<Blob>> {
    return this.downloadFile(this.apiUrl, uri, httpParams);
  }

  private downloadFile(baseUrl: string, uri: string, httpParams?: HttpParams): Observable<HttpResponse<Blob>> {
    const url = `${baseUrl}${uri}`;

    return this.httpClient.get<Blob>(url, {
      responseType: 'blob' as 'json',
      params: httpParams,
      observe: 'response',
    });
  }
}
