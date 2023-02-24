import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LogModel } from '../models/log.model';

@Injectable()
export class LogsService {
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