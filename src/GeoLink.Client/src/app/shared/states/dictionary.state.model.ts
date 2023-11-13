import { EnumDescriptionModel } from '../models/enum-description.model';
import { EnumDescriptionWithScopesModel } from '../models/enum-description-with-scopes.model';
import { EnumDescriptionRegionModel } from '../models/enum-description-region.model';
import { DeviceGroupRelationModel } from '../models/device-group-relation.model';
import { ConfigDefinitionModel } from '../models/config/config-definition.model';
import { FilterAttributeDefinitionModel } from '../models/filters/filter-attribute-definition.model';
import { StatusConfigModel } from '../models/status-config.model';

export interface DictionaryStateModel {
  systemGroups: EnumDescriptionWithScopesModel[];
  systemRoles: EnumDescriptionWithScopesModel[];
  systemRegions: EnumDescriptionRegionModel[];
  systemPermissions: EnumDescriptionModel[];
  systemPermissionsForRoles: EnumDescriptionModel[];
  systemPermissionsForGroups: EnumDescriptionModel[];
  mapObjectTypes: EnumDescriptionModel[];
  mapDeviceTypes: EnumDescriptionModel[];
  mapObjectStatusTypes: EnumDescriptionModel[];
  deviceAttributeSourceTypes: EnumDescriptionModel[];
  deviceGroupsRelation: DeviceGroupRelationModel[];
  timeExtentDefinitions: EnumDescriptionModel[];
  configDefinitions: ConfigDefinitionModel[];
  filterAttributeDefinitions: FilterAttributeDefinitionModel[];
  statusesConfig: StatusConfigModel[];
}
