export interface ChartModel {
  chartTitle: string;
  chartSubtitle: string;
  dateNow: Date;
  dateBegin: Date;
  dateEnd: Date;
  timeExtent: number;
  chartsData: ChartGeneralData; // dane do narysowania wykresu
}

export interface ChartGeneralData {
  chartNames: string[];
  avgAvail: number; // Średnia dostępność (0,100)
  health: number; // Kondycja urządzenia (1,2,3)
  data: ChartData[]; // array z szeregiem czasowym do wyrzucenia na wykres
  chartAxisInfo: ChartAxisInfo;
}

export interface ChartData {
  timestamp: Date;
  values: number[]; // ['Wartości dla standardowego wykresu dostępności', 'Wartości dla wykresu wielomiany (trendu)']
}

export interface ChartAxisInfo {
  x: string;
  y: string;
}
