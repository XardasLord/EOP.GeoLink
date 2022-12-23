import { AfterContentChecked, Component } from '@angular/core';
import { MapItemModel } from '../../models/map-item.model';

@Component({
  selector: 'app-map-item-tooltip-dialog',
  templateUrl: './map-item-tooltip-dialog.component.html',
  styleUrls: ['./map-item-tooltip-dialog.component.scss'],
})
export class MapItemTooltipDialogComponent implements AfterContentChecked {
  public mapItem!: MapItemModel;

  constructor() {
    console.warn('call from constructor');
  }

  ngAfterContentChecked(): void {
    console.warn('call from ngAfterContentChecked');
  }
}
