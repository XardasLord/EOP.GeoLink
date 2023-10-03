export interface AnalyticModel {
  recordCount: number;
  title: string;
  description: string;
  refreshDate: Date;
  data: AnalyticsDynamicData[];
}

export interface AnalyticsDynamicData {
  cells: AnalyticsDynamicCell[];
  action: AnalyticsAction;
}

export interface AnalyticsDynamicCell {
  header: string;
  isStatus: boolean;
  value: string | number;
}

export interface AnalyticsAction {
  mapLon: number;
  mapLat: number;
}
