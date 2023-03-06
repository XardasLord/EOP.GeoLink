import { EnumDescriptionModel } from '../models/enum-description.model';
import { EnumDescriptionWithScopesModel } from '../models/enum-description-with-scopes.model';
import { EnumDescriptionRegionModel } from '../models/enum-description-region.model';

export interface DictionaryStateModel {
  systemGroups: EnumDescriptionWithScopesModel[];
  systemRoles: EnumDescriptionWithScopesModel[];
  systemRegions: EnumDescriptionRegionModel[];
  systemPermissions: EnumDescriptionModel[];
}
