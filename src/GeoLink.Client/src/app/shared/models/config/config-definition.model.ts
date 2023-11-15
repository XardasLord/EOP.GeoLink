export interface ConfigDefinitionModel {
  id: number;
  name:
    | 'LOGS_RETENTION_DAYS'
    | 'HYSTERESIS_THRESHOLD'
    | 'HYSTERESIS_SENSITIVITY'
    | 'DATA_RETENTION_DAYS'
    | 'DATA_RETENTION_ACTION'
    | 'DIAGTOOLS_CONSOLE_SSH_HOSTNAME'
    | 'DIAGTOOLS_WEBSITE_POLKOMTEL'
    | 'DIAGTOOLS_WEBSITE_TMOBILE';
  title: string;
  dataType: 'dict' | 'number' | 'text';
  dict: ConfigDefinitionDictValueModel[];
}

export interface ConfigDefinitionDictValueModel {
  id: number;
  name: string;
}
