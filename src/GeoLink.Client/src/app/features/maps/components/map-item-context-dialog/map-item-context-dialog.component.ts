import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { DeviceModel, MapObjectModel } from '../../models/map-item.model';
import { MapObjectHelper } from '../../helpers/map-object-helper';
import { MapDeviceTypeEnum } from '../../../../shared/models/map-device-type.enum';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';

@Component({
  selector: 'app-map-item-context-dialog',
  templateUrl: './map-item-context-dialog.component.html',
  styleUrls: ['./map-item-context-dialog.component.scss'],
})
export class MapItemContextDialogComponent implements AfterContentChecked {
  public mapObject!: MapObjectModel;
  public groupedDeviceTypes!: Record<string, DeviceModel[]>;
  public deviceStatus = MapObjectStatusTypeEnum;
  public showSubMenu = false;
  public topCssValue = '';

  constructor(
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
    private mapObjectHelper: MapObjectHelper
  ) {
    // https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular#ngonchanges
    console.warn('call from constructor');
  }

  ngAfterContentChecked(): void {
    console.warn('call from ngAfterContentChecked');
    console.log(this.mapObject);
    this.groupedDeviceTypes = this.groupDeviceTypes();
  }

  getObjectType(): string {
    return this.mapObjectHelper.getObjectTypeForMapObject(this.mapObject);
  }

  getDeviceType(deviceType: MapDeviceTypeEnum): string {
    return this.mapObjectHelper.getDeviceTypeForMapObject(deviceType);
  }

  private groupDeviceTypes(): Record<string, DeviceModel[]> {
    return this.mapObjectHelper.getDeviceTypeGroup(this.mapObject.devices);
  }

  showStatusChart(deviceModel: DeviceModel) {
    console.log('Showing device item chart...', deviceModel);
  }

  showDeviceSubMenu(deviceModel: DeviceModel, e: MouseEvent) {
    //   console.log('Showing device item submenu...', deviceItem);
    //   this.showSubMenu = true;
    //
    //   const popupHeight = 400,
    //     popupWidth = 250;
    //
    //   let xPosition, yPosition;
    //   if (e.clientX + popupWidth > window.innerWidth) {
    //     xPosition = e.pageX - popupWidth;
    //   } else {
    //     xPosition = e.pageX;
    //   }
    //
    //   if (e.clientY + popupHeight > window.innerHeight) {
    //     yPosition = e.pageY - popupHeight;
    //   } else {
    //     yPosition = e.pageY;
    //   }
    //
    //   this.topCssValue = yPosition + 'px';
    //
    //   this.changeDetectorRef.detectChanges();
  }
}
