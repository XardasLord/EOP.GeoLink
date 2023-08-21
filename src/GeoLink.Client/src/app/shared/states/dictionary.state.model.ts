import { EnumDescriptionModel } from '../models/enum-description.model';
import { EnumDescriptionWithScopesModel } from '../models/enum-description-with-scopes.model';
import { EnumDescriptionRegionModel } from '../models/enum-description-region.model';
import { DeviceGroupRelationModel } from '../models/device-group-relation.model';
import { ConfigDefinitionModel } from '../models/config/config-definition.model';

export interface DictionaryStateModel {
  systemGroups: EnumDescriptionWithScopesModel[];
  systemRoles: EnumDescriptionWithScopesModel[];
  systemRegions: EnumDescriptionRegionModel[];
  systemPermissions: EnumDescriptionModel[];
  mapObjectTypes: EnumDescriptionModel[];
  mapDeviceTypes: EnumDescriptionModel[];
  mapObjectStatusTypes: EnumDescriptionModel[];
  deviceGroupsRelation: DeviceGroupRelationModel[];
  timeExtentDefinitions: EnumDescriptionModel[];
  configDefinitions: ConfigDefinitionModel[];
}
