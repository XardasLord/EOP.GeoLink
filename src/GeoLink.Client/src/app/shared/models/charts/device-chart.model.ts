export interface DeviceChartModel {
  dateNow: Date;
  dateBegin: Date;
  dateEnd: Date;
  timeExtent: number;
  chartsData: ChartGeneralData[]; // array zawierający dane do narysowania każdego z requestowanych wykresów
}

export interface ChartGeneralData {
  chartName: string;
  avgAvail: number; // Średnia dostępność (0,100)
  devHealth: number; // Kondycja urządzenia (1,2,3)
  trendLineCoeffs: number[]; // Współczynniki wielomianu do narysowania linii trendu, dla avail - wielomian 2 stopnia (3 współczynniki), dla reszty wielomian 1 stopnia (2 współczynniki - linia)
  data: ChartData[]; // array z szeregiem czasowym do wyrzucenia na wykres
}

export interface ChartData {
  timestamp: Date;
  avail: number;
}
