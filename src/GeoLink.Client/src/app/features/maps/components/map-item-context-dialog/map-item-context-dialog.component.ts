import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
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
  public elementLeft = '';
  public elementTop = '';

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

  @ViewChild('myTable') parentTable!: ElementRef;

  showDeviceSubMenu(deviceModel: DeviceModel, event: MouseEvent) {
    this.showSubMenu = true;
    this.adjustDeviceSubMenuPosition(event);
  }

  private adjustDeviceSubMenuPosition(event: MouseEvent) {
    const y = event.pageY;
    const tableRect = this.parentTable.nativeElement.getBoundingClientRect();
    const tableTop = tableRect.top + window.scrollY;
    const windowHeight = window.innerHeight;
    const maxY = windowHeight;
    const top = y - tableTop > maxY ? maxY : y - tableTop;
    this.elementLeft = `290px`;
    this.elementTop = `${top}px`;

    this.changeDetectorRef.detectChanges();
  }
}
