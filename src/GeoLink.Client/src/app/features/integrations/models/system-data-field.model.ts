export interface SystemDataFieldModel {
  systemName: string;
  dataFields: SystemDataFieldData[];
}

export interface SystemDataFieldData {
  sourceField: string;
  geolinkField: string;
  info: string;
}
