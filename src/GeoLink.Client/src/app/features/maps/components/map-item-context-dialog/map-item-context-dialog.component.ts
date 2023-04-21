import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { DeviceItemModel, MapObjectModel } from '../../models/map-item.model';

@Component({
  selector: 'app-map-item-context-dialog',
  templateUrl: './map-item-context-dialog.component.html',
  styleUrls: ['./map-item-context-dialog.component.scss'],
})
export class MapItemContextDialogComponent implements AfterContentChecked {
  public mapItem!: MapObjectModel;
  public showSubMenu = false;
  public topCssValue = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    // https://indepth.dev/posts/1054/here-is-what-you-need-to-know-about-dynamic-components-in-angular#ngonchanges
    console.warn('call from constructor');
  }

  ngAfterContentChecked(): void {
    console.warn('call from ngAfterContentChecked');
  }

  showStatusChart(deviceItem: DeviceItemModel) {
    console.log('Showing device item chart...', deviceItem);
  }

  showDeviceSubMenu(deviceItem: DeviceItemModel, e: MouseEvent) {
    console.log('Showing device item submenu...', deviceItem);
    this.showSubMenu = true;

    const popupHeight = 400,
      popupWidth = 250;

    let xPosition, yPosition;
    if (e.clientX + popupWidth > window.innerWidth) {
      xPosition = e.pageX - popupWidth;
    } else {
      xPosition = e.pageX;
    }

    if (e.clientY + popupHeight > window.innerHeight) {
      yPosition = e.pageY - popupHeight;
    } else {
      yPosition = e.pageY;
    }

    this.topCssValue = yPosition + 'px';

    this.changeDetectorRef.detectChanges();
  }
}
