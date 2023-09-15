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
      devHealth: 0,
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
    const xAxisData: string[] = [];
    const standardChartData: number[] = [];
    const polynomialChartData: number[] = [];

    model.chartsData.data.forEach(chartData => {
      const date = new Date(chartData.timestamp);
      const formattedDate = `${date.getHours().toString()}:${date.getMinutes().toString()}`;

      xAxisData.push(formattedDate);
      standardChartData.push(chartData.values[0]);
      polynomialChartData.push(chartData.values[1]);
    });

    this.chartOptions = {
      legend: {
        data: [model.chartsData.chartNames[0], model.chartsData.chartNames[1]],
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
          name: model.chartsData.chartNames[0],
          type: 'line',
          data: standardChartData,
          animationDelay: idx => idx * 10,
        },
        {
          name: model.chartsData.chartNames[1],
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
