import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';
import { ChartService } from '../../../services/chart.service';
import { ChartModel } from '../../../models/charts/chart.model';
import { ChartTypeEnum } from '../../../models/charts/chart-type.enum';
import { MapObjectStatusTypeEnum } from '../../../models/map-object-status-type.enum';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleDeviceChartDialogModel } from '../../../models/charts/single-device-chart-dialog.model';

@Component({
  selector: 'app-single-chart-dialog',
  templateUrl: './single-chart-dialog.component.html',
  styleUrls: ['./single-chart-dialog.component.scss'],
})
export class SingleChartDialogComponent implements OnInit, OnDestroy {
  private chartType!: ChartTypeEnum;
  private readonly deviceId: number | undefined;
  private readonly systemId: number | undefined;
  private readonly attributeId: number | undefined;

  protected readonly MapObjectStatusTypeEnum = MapObjectStatusTypeEnum;

  public chartModel: ChartModel = {
    chartsData: {
      data: [],
      chartNames: [],
      health: 0,
      avgAvail: 0,
      chartAxisInfo: {
        x: '',
        y: '',
      },
    },
    dateNow: new Date(),
    dateBegin: new Date(),
    dateEnd: new Date(),
    timeExtent: 0,
  };

  chartOptions!: EChartsOption;
  isLoading = true;

  private getChartSubscription: Subscription = new Subscription();

  constructor(
    private deviceChartService: ChartService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: SingleDeviceChartDialogModel
  ) {
    this.deviceId = data.deviceId;
    this.systemId = data.systemId;
    this.chartType = data.chartType;
    this.attributeId = data.attributeId;
  }

  ngOnInit(): void {
    this.prepareChartMock();

    if (this.deviceId) {
      this.getChartSubscription.add(
        this.deviceChartService.getDeviceChart(this.deviceId, this.chartType).subscribe(deviceChartModel => {
          this.isLoading = false;
          this.chartModel = deviceChartModel;

          console.warn(deviceChartModel);

          this.prepareChart(deviceChartModel);

          this.changeDetectorRef.detectChanges();
        })
      );
    } else if (this.systemId) {
      this.getChartSubscription.add(
        this.deviceChartService.getSystemChart(this.systemId).subscribe(chartModel => {
          this.isLoading = false;
          this.chartModel = chartModel;

          console.warn(chartModel);

          this.prepareChart(chartModel);

          this.changeDetectorRef.detectChanges();
        })
      );
    } else if (this.attributeId) {
      this.getChartSubscription.add(
        this.deviceChartService.getAttributeCharts(this.attributeId).subscribe(chartModel => {
          this.isLoading = false;
          this.chartModel = chartModel;

          console.warn(chartModel);

          this.prepareChart(chartModel);

          this.changeDetectorRef.detectChanges();
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.getChartSubscription.unsubscribe();
  }

  prepareChartMock() {
    const xAxisData = [];
    const standardChartData = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      standardChartData.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.chartOptions = {
      legend: {
        data: ['bar'],
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
          data: standardChartData,
          animationDelay: idx => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }

  prepareChart(model: ChartModel) {
    const dayMonthInfo: (null | string)[] = [];
    const xAxisData: string[] = [];
    const standardChartData: number[] = [];
    const polynomialChartData: number[] = [];

    model.chartsData.data.forEach(chartData => {
      const date = new Date(chartData.timestamp);
      const formattedDate = `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

      const formattedDayMonth = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

      dayMonthInfo.push(formattedDayMonth);

      xAxisData.push(formattedDate);
      standardChartData.push(chartData.values[0]);
      polynomialChartData.push(chartData.values[1]);
    });

    this.chartOptions = {
      legend: {
        data: [model.chartsData.chartNames[0], model.chartsData.chartNames[1]],
        align: 'left',
      },
      tooltip: {
        backgroundColor: 'lightyellow',
      },
      xAxis: {
        data: xAxisData,
        name: model.chartsData.chartAxisInfo.x,
        nameLocation: 'middle',
        nameGap: 50,
        nameTextStyle: {
          color: 'black',
          fontSize: 20,
        },
        silent: false,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: function (value: string, index: number) {
            const dayMonth = dayMonthInfo[index];

            return `{bold|${dayMonth}}\n${value}`;
          },
          rich: {
            bold: {
              fontWeight: 'bold',
              color: 'blue',
            },
          },
        },
      },
      yAxis: {
        name: model.chartsData.chartAxisInfo.y,
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: 'black',
          fontSize: 20,
        },
      },
      series: [
        {
          name: model.chartsData.chartNames[0],
          type: 'line',
          data: standardChartData,
          animationDelay: idx => idx * 10,
          showAllSymbol: true,
        },
        {
          name: model.chartsData.chartNames[1],
          type: 'line',
          data: polynomialChartData,
          lineStyle: {
            type: 'dotted',
          },
          color: 'red',
          smooth: true,
          animationDelay: idx => idx * 10 + 100,
          showAllSymbol: true,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }
}
