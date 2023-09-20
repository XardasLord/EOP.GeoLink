import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { DeviceStatisticsModel, MapClusterGroupDetails, MapObjectGroupModel } from '../../models/map-item.model';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';
import { MapObjectHelper } from '../../helpers/map-object-helper';
import { MapsService } from '../../services/maps.service';
import { MapObjectTypeEnum } from '../../../../shared/models/map-object-type.enum';
import { MapDeviceTypeEnum } from '../../../../shared/models/map-device-type.enum';
import { FiltersState } from '../../../../shared/states/filters.state';

@Component({
  selector: 'app-map-cluster-group-context-dialog',
  templateUrl: './map-cluster-group-context-dialog.component.html',
  styleUrls: ['./map-cluster-group-context-dialog.component.scss'],
})
export class MapClusterGroupContextDialogComponent implements AfterContentChecked, OnDestroy {
  @ViewChild('myTable') parentTable!: ElementRef;

  public mapItems!: MapObjectGroupModel[];
  public clusterId!: number;
  public level!: number;
  public secondLevelClusterGroupDetailsModels!: MapClusterGroupDetails;

  public showSubMenu = false;
  // public elementLeft = '';
  // public elementTop = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
    private mapObjectHelper: MapObjectHelper,
    private mapsService: MapsService
  ) {
    // https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular#ngonchanges
    console.warn('call from constructor');
  }

  ngAfterContentChecked(): void {
    console.warn('call from ngAfterContentChecked');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAllObjectsInsideCluster(): number {
    const totalObjCount = this.mapItems.reduce((sum, mapObjectGroup) => {
      return sum + mapObjectGroup.objCount;
    }, 0);

    return totalObjCount;
  }

  getAllObjectsInsideGroup(group: MapClusterGroupDetails): number {
    if (!group) return 0;

    const totalObjCount = group.devGroups.reduce((sum, mapObjectGroup) => {
      return sum + mapObjectGroup.devCount;
    }, 0);

    return totalObjCount;
  }

  getObjectType(objectType: MapObjectTypeEnum): string {
    return this.mapObjectHelper.getObjectType(objectType);
  }

  getDeviceType(deviceType: MapDeviceTypeEnum): string {
    return this.mapObjectHelper.getDeviceTypeForMapObject(deviceType);
  }

  getSuccessStatusDevicesCount(group: MapObjectGroupModel): number {
    const totalCount = group.devStat
      .filter(devStat => devStat.idStat === MapObjectStatusTypeEnum.OK)
      .reduce((sum, devStat) => sum + devStat.stCount, 0);

    return totalCount;
  }

  getSuccessStatusDevicesGroupCount(group: DeviceStatisticsModel[]): number {
    const totalCount = group.reduce((acc, cur) => {
      if (cur.idStat === MapObjectStatusTypeEnum.OK) {
        return acc + cur.stCount;
      } else {
        return acc;
      }

      return acc;
    }, 0);

    return totalCount;
  }

  getWarningStatusDevicesCount(group: MapObjectGroupModel): number {
    const totalCount = group.devStat
      .filter(devStat => devStat.idStat === MapObjectStatusTypeEnum.Warning)
      .reduce((sum, devStat) => sum + devStat.stCount, 0);

    return totalCount;
  }

  getWarningStatusDevicesGroupCount(group: DeviceStatisticsModel[]): number {
    const totalCount = group.reduce((acc, cur) => {
      if (cur.idStat === MapObjectStatusTypeEnum.Warning) {
        return acc + cur.stCount;
      } else {
        return acc;
      }

      return acc;
    }, 0);

    return totalCount;
  }

  getBadStatusDevicesCount(group: MapObjectGroupModel): number {
    const totalCount = group.devStat
      .filter(devStat => devStat.idStat === MapObjectStatusTypeEnum.Error)
      .reduce((sum, devStat) => sum + devStat.stCount, 0);

    return totalCount;
  }

  getBadStatusDevicesGroupCount(group: DeviceStatisticsModel[]): number {
    const totalCount = group.reduce((acc, cur) => {
      if (cur.idStat === MapObjectStatusTypeEnum.Error) {
        return acc + cur.stCount;
      } else {
        return acc;
      }

      return acc;
    }, 0);

    return totalCount;
  }

  showClusterGroupSubMenu(groupModel: MapObjectGroupModel, event: MouseEvent) {
    this.showSubMenu = true;
    // this.adjustDeviceSubMenuPosition(event);

    const selectedDeviceMapFilters = this.store.selectSnapshot(FiltersState.getSelectedDeviceMapFilters);
    const selectedRegionMapFilters = this.store.selectSnapshot(FiltersState.getSelectedRegionMapFilters);
    const selectedStatusMapFilters = this.store.selectSnapshot(FiltersState.getSelectedStatusMapFilters);
    const selectedAttributeFilters = this.store.selectSnapshot(FiltersState.getFilterAttributeModels);

    this.subscriptions.add(
      this.mapsService
        .getClusterInfo(
          this.clusterId,
          this.level,
          groupModel.objType,
          selectedDeviceMapFilters,
          selectedRegionMapFilters,
          selectedStatusMapFilters,
          selectedAttributeFilters
        )
        .subscribe(clusterGroupModels => {
          console.log(clusterGroupModels);
          this.secondLevelClusterGroupDetailsModels = clusterGroupModels;
          this.changeDetectorRef.detectChanges();
        })
    );
  }

  closeSubMenu() {
    this.showSubMenu = false;
    this.changeDetectorRef.detectChanges();
  }

  // private adjustDeviceSubMenuPosition(event: MouseEvent) {
  //   const y = event.pageY;
  //   const tableRect = this.parentTable.nativeElement.getBoundingClientRect();
  //   const tableTop = tableRect.top + window.scrollY;
  //   const windowHeight = window.innerHeight;
  //   const maxY = windowHeight;
  //   const top = y - tableTop > maxY ? maxY : y - tableTop;
  //   this.elementLeft = `437px`;
  //   this.elementTop = `${top}px`;
  //
  //   this.changeDetectorRef.detectChanges();
  // }
}
