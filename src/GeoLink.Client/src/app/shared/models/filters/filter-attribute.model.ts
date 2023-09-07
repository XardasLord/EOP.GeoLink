import { FilterAttributeNameDefinitionEnum } from './filter-attribute-definition.model';

export interface FilterAttributeModel {
  idAtrF: number;
  atrFType: number;
  name: FilterAttributeNameDefinitionEnum;
  value: string;
  beginsWith: boolean;
  endsWith: boolean;
}
