import { AfterContentChecked, Component } from '@angular/core';
import { DeviceItemModel, MapItemModel } from '../../models/map-item.model';

@Component({
  selector: 'app-map-item-context-dialog',
  templateUrl: './map-item-context-dialog.component.html',
  styleUrls: ['./map-item-context-dialog.component.scss'],
})
export class MapItemContextDialogComponent implements AfterContentChecked {
  public mapItem!: MapItemModel;

  constructor() {
    console.warn('call from constructor');
  }

  ngAfterContentChecked(): void {
    console.warn('call from ngAfterContentChecked');
  }

  showStatusChart(deviceItem: DeviceItemModel) {
    console.log('Showing device item chart...', deviceItem);
  }
}
