import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadAlgorithms } from '../../states/analytics.action';
import { AnalyticsState } from '../../states/analytics.state';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss'],
})
export class AlgorithmsComponent implements OnInit {
  algorithms$ = this.store.select(AnalyticsState.getAlgorithms);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadAlgorithms());
  }
}
