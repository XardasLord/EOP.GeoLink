export interface ConfigDefinitionModel {
  id: number;
  name: string;
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
