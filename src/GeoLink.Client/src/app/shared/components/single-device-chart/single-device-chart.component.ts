import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';
import { ChartService } from '../../services/chart.service';
import { ChartModel } from '../../models/charts/chart.model';
import { ChartTypeEnum } from '../../models/charts/chart-type.enum';
import { MapObjectStatusTypeEnum } from '../../models/map-object-status-type.enum';

@Component({
  selector: 'app-single-device-chart',
  templateUrl: './single-device-chart.component.html',
  styleUrls: ['./single-device-chart.component.scss'],
})
export class SingleDeviceChartComponent implements OnInit, OnDestroy {
  @Input() public chartType!: ChartTypeEnum;
  @Input() public deviceId!: number;

  protected readonly MapObjectStatusTypeEnum = MapObjectStatusTypeEnum;

  public deviceChartModel: ChartModel = {
    chartsData: [],
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
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.prepareChartMock();

    this.getChartSubscription.add(
      this.deviceChartService.getDeviceChart(this.deviceId, this.chartType).subscribe(deviceChartModel => {
        this.isLoading = false;
        this.deviceChartModel = deviceChartModel;

        console.warn(deviceChartModel);

        this.prepareChart(deviceChartModel);

        this.changeDetectorRef.detectChanges();
      })
    );
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
    const xAxisData: string[] = [];
    const standardChartData: number[] = [];
    const polynomialChartData: number[] = [];

    model.chartsData[0].data.forEach(chartData => {
      const date = new Date(chartData.timestamp);
      const formattedDate = `${date.getHours().toString()}:${date.getMinutes().toString()}`;

      xAxisData.push(formattedDate);
      standardChartData.push(chartData.values[0]);
      polynomialChartData.push(chartData.values[1]);
    });

    this.chartOptions = {
      legend: {
        data: [model.chartsData[0].chartName, 'Trend'],
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
          name: model.chartsData[0].chartName,
          type: 'line',
          data: standardChartData,
          animationDelay: idx => idx * 10,
        },
        {
          name: 'Trend',
          type: 'line',
          lineStyle: {
            type: 'dotted',
          },
          color: 'red',
          smooth: true,
          data: polynomialChartData,
          animationDelay: idx => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }
}
