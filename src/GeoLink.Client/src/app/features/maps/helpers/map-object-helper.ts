import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MapObjectGroupModel, MapObjectModel } from '../models/map-item.model';
import { EnumDescriptionModel } from '../../../shared/models/enum-description.model';
import { DictionaryState } from '../../../shared/states/dictionary.state';
import { MapDeviceTypeEnum } from '../../../shared/models/map-device-type.enum';

@Injectable({ providedIn: 'root' })
export class MapObjectHelper {
  public objectTypes: EnumDescriptionModel[] = this.store.selectSnapshot(DictionaryState.getMapObjectTypes);
  public deviceTypes: EnumDescriptionModel[] = this.store.selectSnapshot(DictionaryState.getMapDeviceTypes);

  constructor(private store: Store) {}

  getObjectTypeForMapClusterGroup(group: MapObjectGroupModel): string {
    return this.objectTypes.filter(x => x.id === group.objType)[0]?.name;
  }

  getObjectTypeForMapObject(object: MapObjectModel): string {
    return this.objectTypes.filter(x => x.id === object.objType)[0]?.name;
  }

  getDeviceTypeForMapObject(deviceType: MapDeviceTypeEnum): string {
    return this.deviceTypes.filter(x => x.id === deviceType)[0]?.name;
  }
}
