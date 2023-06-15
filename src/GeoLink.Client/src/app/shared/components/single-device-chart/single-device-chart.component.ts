import { Component, Input, OnInit } from '@angular/core';
import { SingleDeviceChartTypeEnum } from '../../models/single-device-chart-type.enum';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-single-device-chart',
  templateUrl: './single-device-chart.component.html',
  styleUrls: ['./single-device-chart.component.scss'],
})
export class SingleDeviceChartComponent implements OnInit {
  @Input() public chartType!: SingleDeviceChartTypeEnum;
  @Input() public deviceId!: number;

  chartOptions!: EChartsOption;

  ngOnInit(): void {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.chartOptions = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'line',
          data: data1,
          animationDelay: idx => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: idx => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }
}
