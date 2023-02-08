import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RemoteServiceBase } from '../../../shared/services/remote-service.base';

@Injectable()
export class AnalyticsService extends RemoteServiceBase {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  loadAlgorithms(): Observable<string[]> {
    const algorithms = [
      '1. Urządzenia w statusie krytycznym lub zagrożonym na obszarze jednego rejonu energetycznego przekracza zadaną wartość',
      '2. Urządzenia w statusie krytycznym lub zagrożonym na obszarze jednego rejonu energetycznego przekracza zadaną wartość',
      '3. Lokalizacje gdzie liczba routerów i modemów zalogowanych do tej samej stacji bazowej przekracza zadaną wartość',
    ];

    return of(algorithms);
  }

  loadConjunction(): Observable<string[]> {
    const conjunctions = [
      'Koniunkcja 1 (liczba urządzeń jest w statusie ...).',
      'Koniunkcja 2 (ile urządzeń jest w statusie ...).',
    ];

    return of(conjunctions);
  }
}
