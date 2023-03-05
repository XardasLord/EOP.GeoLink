import { EnumDescriptionModel } from '../models/enum-description.model';

export interface DictionaryStateModel {
  systemGroups: EnumDescriptionModel[];
  systemRoles: EnumDescriptionModel[];
  systemRegions: EnumDescriptionModel[];
  systemPermissions: EnumDescriptionModel[];
}
