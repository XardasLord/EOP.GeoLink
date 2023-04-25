import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MapObjectGroupModel, MapObjectModel } from '../models/map-item.model';
import { EnumDescriptionModel } from '../../../shared/models/enum-description.model';
import { DictionaryState } from '../../../shared/states/dictionary.state';

@Injectable({ providedIn: 'root' })
export class MapObjectHelper {
  public objectTypes: EnumDescriptionModel[] = this.store.selectSnapshot(DictionaryState.getMapObjectTypes);

  constructor(private store: Store) {}

  getObjectTypeForMapClusterGroup(group: MapObjectGroupModel): string {
    return this.objectTypes.filter(x => x.id === group.objType)[0]?.name;
  }

  getObjectTypeForMapObject(object: MapObjectModel): string {
    return this.objectTypes.filter(x => x.id === object.objType)[0]?.name;
  }
}
