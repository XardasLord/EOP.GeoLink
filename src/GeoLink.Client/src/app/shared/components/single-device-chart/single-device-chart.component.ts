import { Component, Input } from '@angular/core';
import { SingleDeviceChartTypeEnum } from '../../models/single-device-chart-type.enum';

@Component({
  selector: 'app-single-device-chart',
  templateUrl: './single-device-chart.component.html',
  styleUrls: ['./single-device-chart.component.scss'],
})
export class SingleDeviceChartComponent {
  @Input() public chartType!: SingleDeviceChartTypeEnum;
  @Input() public deviceId!: number;
}
