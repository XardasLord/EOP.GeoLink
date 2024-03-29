import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';
import { ChartService } from '../../services/chart.service';
import { ChartModel } from '../../models/charts/chart.model';
import { MapObjectStatusTypeEnum } from '../../models/map-object-status-type.enum';

@Component({
  selector: 'app-single-device-attribute-chart',
  templateUrl: './single-device-attribute-chart.component.html',
  styleUrls: ['./single-device-attribute-chart.component.scss'],
})
export class SingleDeviceAttributeChartComponent implements OnInit, OnDestroy {
  @Input() public attributeId!: number;

  protected readonly MapObjectStatusTypeEnum = MapObjectStatusTypeEnum;

  public chartModel: ChartModel = {
    chartsData: {
      data: [],
      chartNames: [],
      avgAvail: 0,
      health: 0,
      chartAxisInfo: {
        x: '',
        y: '',
      },
    },
    dateNow: new Date(),
    dateBegin: new Date(),
    dateEnd: new Date(),
    timeExtent: 0,
    chartTitle: '',
    chartSubtitle: '',
  };

  chartOptions!: EChartsOption;
  isLoading = true;

  private getChartSubscription: Subscription = new Subscription();

  constructor(
    private deviceChartService: ChartService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getChartSubscription.add(
      this.deviceChartService.getAttributeCharts(this.attributeId).subscribe(chartModel => {
        this.isLoading = false;
        this.chartModel = chartModel;

        this.prepareChart(chartModel);

        this.changeDetectorRef.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.getChartSubscription.unsubscribe();
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
        nameGap: 40,
        nameTextStyle: {
          color: 'black',
          fontSize: 13,
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
        nameGap: 30,
        nameTextStyle: {
          color: 'black',
          fontSize: 13,
        },
      },
      series: [
        {
          // https://stackoverflow.com/questions/48375036/working-with-many-data-points-in-echarts-js
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
