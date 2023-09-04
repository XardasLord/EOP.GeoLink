import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { MapObjectStatusTypeEnum } from '../../../../shared/models/map-object-status-type.enum';
import { ChartsState } from '../../states/charts.state';

@Component({
  selector: 'app-single-data-chart',
  templateUrl: './single-data-chart.component.html',
  styleUrls: ['./single-data-chart.component.scss'],
})
export class SingleDataChartComponent {
  isLoading$ = this.store.select(ChartsState.getIsLoading);
  chartOptions$ = this.store.select(ChartsState.getEChartsOption);
  chart$ = this.store.select(ChartsState.getChart);

  protected readonly MapObjectStatusTypeEnum = MapObjectStatusTypeEnum;

  constructor(private store: Store) {}
}
