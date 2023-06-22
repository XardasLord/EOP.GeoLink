export enum ChartTypeEnum {
  Availability = 'avail', // podstawowy wykres "Dostępność". Zwraca dane dyskretne w sposób 0,100 (0 - niedostępne, 100 - dostępne) na dany timestamp
  MovingAverage = 'movingavg', // wykres średniej ruchomej, na mockach "Średnia dostępność", zwraca dane w przedziale <0,100>
  MovingGeometryAverage = 'movingGeomAvg', // wykres geometrycznej średniej ruchomej, na mockach "Średnia dostępność geometryczna" - zwraca dane w przedziale <0,100>
}
