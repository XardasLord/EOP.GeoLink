import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILogsService } from './logs.service.base';
import { LogModel } from '../models/log.model';

@Injectable()
export class LogsService extends ILogsService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  load(): Observable<LogModel[]> {
    const logs: LogModel[] = [
      { date: new Date(), category: 'System', message: 'Utrata komunikacji z System Ekspercki MindMade' },
      { date: new Date(), category: 'System', message: 'Przywrócenie komunikacji z System Ekspercki MindMade' },
      { date: new Date(), category: 'System', message: 'Wolny odczyt danych z Baza ORACLE GeoLink' },
      { date: new Date(), category: 'System', message: 'Utrata komunikacji z Baza ORACLE GeoLink' },
      { date: new Date(), category: 'System', message: 'Przywrócenie komunikacji z Baza ORACLE GeoLink' },
      { date: new Date(), category: 'User', message: 'Dodano pozycję do menu filtra obiekty' },
    ];

    return of(logs);
  }
}
