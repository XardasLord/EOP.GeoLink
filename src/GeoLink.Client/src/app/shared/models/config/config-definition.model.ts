export interface ConfigDefinitionModel {
  id: number;
  name:
    | 'LOGS_RETENTION_DAYS'
    | 'HYSTERESIS_THRESHOLD'
    | 'HYSTERESIS_SENSITIVITY'
    | 'DATA_RETENTION_DAYS'
    | 'DATA_RETENTION_ACTION'
    | 'DIAGTOOLS_PRTG_URL'
    | 'DIAGTOOLS_CONSOLE_SSH_HOSTNAME';
  title: string;
  dataType: 'dict' | 'number' | 'text';
  dict: ConfigDefinitionDictValueModel[];
}

export interface ConfigDefinitionDictValueModel {
  id: number;
  name: string;
}
