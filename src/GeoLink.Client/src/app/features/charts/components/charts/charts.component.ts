import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Load } from '../../states/charts.action';
import { Observable } from 'rxjs';
import { ChartsState } from '../../states/charts.state';
import { ChartModel } from '../../../../shared/models/charts/chart.model';
import { ChartTypeEnum } from '../../../../shared/models/charts/chart-type.enum';
import { DictionaryState } from '../../../../shared/states/dictionary.state';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  chartModel$: Observable<ChartModel | null> = this.store.select(ChartsState.getChart);
  timeExtentDictionary$ = this.store.select(DictionaryState.getTimeExtentDefinitions);

  protected readonly ChartTypeEnum = ChartTypeEnum;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  setTimeExtent(timeExtent: number) {
    this.store.dispatch(new Load(timeExtent));
  }
}
