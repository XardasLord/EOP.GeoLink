import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DeviceModel, MapObjectModel } from '../models/map-item.model';
import { EnumDescriptionModel } from '../../../shared/models/enum-description.model';
import { DictionaryState } from '../../../shared/states/dictionary.state';
import { MapDeviceTypeEnum } from '../../../shared/models/map-device-type.enum';
import { DeviceGroupRelationModel } from '../../../shared/models/device-group-relation.model';
import { MapObjectTypeEnum } from '../../../shared/models/map-object-type.enum';

@Injectable({ providedIn: 'root' })
export class MapObjectHelper {
  private objectTypes: EnumDescriptionModel[] = this.store.selectSnapshot(DictionaryState.getMapObjectTypes);
  private deviceTypes: EnumDescriptionModel[] = this.store.selectSnapshot(DictionaryState.getMapDeviceTypes);
  private deviceGroupsRelation: DeviceGroupRelationModel[] = this.store.selectSnapshot(
    DictionaryState.getDeviceGroupsRelation
  );

  constructor(private store: Store) {}

  getObjectType(objectType: MapObjectTypeEnum): string {
    return this.objectTypes.filter(x => x.id === objectType)[0]?.name;
  }

  getObjectTypeForMapObject(object: MapObjectModel): string {
    return this.objectTypes.filter(x => x.id === object.objType)[0]?.name;
  }

  getDeviceTypeForMapObject(deviceType: MapDeviceTypeEnum): string {
    return this.deviceTypes.filter(x => x.id === deviceType)[0]?.name;
  }

  getDeviceTypeGroup(devices: DeviceModel[]): Record<string, DeviceModel[]> {
    type DeviceGroupMapping = Record<string, DeviceModel[]>;
    const mapping: DeviceGroupMapping = {};

    devices.forEach(device => {
      const matchingRelation = this.deviceGroupsRelation.find(relation => relation.devType === device.devType);
      if (matchingRelation) {
        const { devGroup } = matchingRelation;
        if (!mapping[devGroup]) {
          mapping[devGroup] = [];
        }
        mapping[devGroup].push(device);
      }
    });

    return mapping;
  }
}
