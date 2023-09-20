import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  DeviceDetailsModel,
  DeviceDetailsAttributeModel,
  DeviceModel,
  MapObjectModel,
} from '../../models/map-item.model';
import { MapObjectHelper } from '../../helpers/map-object-helper';
import { MapDeviceTypeEnum } from '../../../../shared/models/map-device-type.enum';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';
import { MapsService } from '../../services/maps.service';

@Component({
  selector: 'app-map-item-context-dialog',
  templateUrl: './map-item-context-dialog.component.html',
  styleUrls: ['./map-item-context-dialog.component.scss'],
})
export class MapItemContextDialogComponent implements AfterContentChecked, OnDestroy {
  @ViewChild('myTable') parentTable!: ElementRef;

  public mapObject!: MapObjectModel;
  public secondLevelDeviceDetailsModel: DeviceDetailsModel = {
    devType: MapDeviceTypeEnum.Licznik,
    model: '',
    producer: '',
    ppe: '',
    idDev: 0,
    params: [],
    diagTools: [],
    subDevId: [],
  };

  public groupedDeviceTypes!: Record<string, DeviceModel[]>;
  public deviceStatus = MapObjectStatusTypeEnum;
  public showSubMenu = false;
  public showChartMenu = false;
  // public subMenuElementLeft = '';
  // public subMenuElementTop = '';
  // public attributeStatusChartElementLeft = '';
  // public attributeStatusChartElementTop = '';
  public selectedAttributeId = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private mapObjectHelper: MapObjectHelper,
    private mapsService: MapsService
  ) {
    // https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular#ngonchanges
    console.warn('call from constructor');
  }

  ngAfterContentChecked(): void {
    console.warn('call from ngAfterContentChecked');
    console.log(this.mapObject);
    this.groupedDeviceTypes = this.groupDeviceTypes();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

  showAttributeStatusChart(deviceAttribute: DeviceDetailsAttributeModel, event: MouseEvent) {
    if (!deviceAttribute.isChart) {
      return;
    }

    this.selectedAttributeId = deviceAttribute.idAtr;
    this.showChartMenu = false;
    this.changeDetectorRef.detectChanges();
    this.showChartMenu = true;
    // this.adjustAttributeStatusChartMenuPosition(event);

    this.changeDetectorRef.detectChanges();
  }

  showDeviceSubMenu(deviceModel: DeviceModel, event: MouseEvent) {
    this.showSubMenu = true;
    this.showChartMenu = false;
    // this.adjustDeviceSubMenuPosition(event);

    const deviceIds = [deviceModel.idDev];
    this.subscriptions.add(
      this.mapsService.getDevices(deviceIds).subscribe(deviceStatisticsModels => {
        this.secondLevelDeviceDetailsModel = deviceStatisticsModels[0];
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  closeSubMenu() {
    this.showSubMenu = false;
    this.showChartMenu = false;
    this.changeDetectorRef.detectChanges();
  }

  // private adjustDeviceSubMenuPosition(event: MouseEvent) {
  //   // TODO: Get scrollY from the scrolled component instead of 'window.scrollY'
  //   // TODO: This window should open on a static fixed position
  //   const y = event.pageY;
  //   const tableRect = this.parentTable.nativeElement.getBoundingClientRect();
  //   const tableTop = tableRect.top + window.scrollY;
  //   const windowHeight = window.innerHeight;
  //   const maxY = windowHeight;
  //   const top = y - tableTop > maxY ? maxY : y - tableTop;
  //   this.subMenuElementLeft = `425px`;
  //   this.subMenuElementTop = `${top}px`;
  //
  //   this.changeDetectorRef.detectChanges();
  // }

  // private adjustAttributeStatusChartMenuPosition(event: MouseEvent) {
  //   // TODO: This window should open on a static fixed position
  //   const y = event.pageY;
  //   const tableRect = this.parentTable.nativeElement.getBoundingClientRect();
  //   const tableTop = tableRect.top + window.scrollY;
  //   const windowHeight = window.innerHeight;
  //   const maxY = windowHeight;
  //   const top = y - tableTop > maxY ? maxY : y - tableTop;
  //   this.attributeStatusChartElementLeft = `-60px`;
  //   this.attributeStatusChartElementTop = `${top}px`;
  //
  //   this.changeDetectorRef.detectChanges();
  // }
}
