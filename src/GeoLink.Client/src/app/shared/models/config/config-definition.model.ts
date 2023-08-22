export interface ConfigDefinitionModel {
  id: number;
  name: 'HYSTERESIS_THRESHOLD' | 'HYSTERESIS_SENSITIVITY' | 'DATA_RETENTION_DAYS' | 'DATA_RETENTION_ACTION';
  title: string;
  dataType: 'dict' | 'number' | 'text';
  isEditable: boolean;
  isSensitive: boolean;
  dict: ConfigDefinitionDictValueModel[];
}

export interface ConfigDefinitionDictValueModel {
  id: number;
  name: string;
}
