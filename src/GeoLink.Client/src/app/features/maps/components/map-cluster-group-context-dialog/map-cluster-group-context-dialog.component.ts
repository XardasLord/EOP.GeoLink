import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapObjectGroupModel } from '../../models/map-item.model';
import { DictionaryState } from '../../../../shared/states/dictionary.state';
import { EnumDescriptionModel } from '../../../../shared/models/enum-description.model';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';

@Component({
  selector: 'app-map-cluster-group-context-dialog',
  templateUrl: './map-cluster-group-context-dialog.component.html',
  styleUrls: ['./map-cluster-group-context-dialog.component.scss'],
})
export class MapClusterGroupContextDialogComponent implements AfterContentChecked {
  public mapItems!: MapObjectGroupModel[];
  public objectTypes: EnumDescriptionModel[] = this.store.selectSnapshot(DictionaryState.getMapObjectTypes);

  constructor(private store: Store, private changeDetectorRef: ChangeDetectorRef) {
    // https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular#ngonchanges
    console.warn('call from constructor');
  }

  ngAfterContentChecked(): void {
    console.warn('call from ngAfterContentChecked');
  }

  getAllObjectsInsideCluster(): number {
    const totalObjCount = this.mapItems.reduce((sum, mapObjectGroup) => {
      return sum + mapObjectGroup.objCount;
    }, 0);

    return totalObjCount;
  }

  getObjectType(group: MapObjectGroupModel): string {
    return this.objectTypes.filter(x => x.id === group.objType)[0]?.name;
  }

  getSuccessStatusDevicesCount(group: MapObjectGroupModel): number {
    const totalCount = group.devStat
      .filter(devStat => devStat.idStat === MapObjectStatusTypeEnum.OK)
      .reduce((sum, devStat) => sum + devStat.stCount, 0);

    return totalCount;
  }

  getWarningStatusDevicesCount(group: MapObjectGroupModel): number {
    const totalCount = group.devStat
      .filter(devStat => devStat.idStat === MapObjectStatusTypeEnum.Warning)
      .reduce((sum, devStat) => sum + devStat.stCount, 0);

    return totalCount;
  }

  getBadStatusDevicesCount(group: MapObjectGroupModel): number {
    const totalCount = group.devStat
      .filter(devStat => devStat.idStat === MapObjectStatusTypeEnum.Error)
      .reduce((sum, devStat) => sum + devStat.stCount, 0);

    return totalCount;
  }
}
