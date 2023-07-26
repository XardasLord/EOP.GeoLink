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
  data: ChartData[]; // array z szeregiem czasowym do wyrzucenia na wykres
}

export interface ChartData {
  timestamp: Date;
  values: number[]; // ['Wartości dla standardowego wykresu dostępności', 'Wartości dla wykresu wielomiany (trendu)']
}
