import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadConjunctions } from '../../states/analytics.action';
import { AnalyticsState } from '../../states/analytics.state';

@Component({
  selector: 'app-conjunctions',
  templateUrl: './conjunctions.component.html',
  styleUrls: ['./conjunctions.component.scss'],
})
export class ConjunctionsComponent implements OnInit {
  conjunctions$ = this.store.select(AnalyticsState.getConjunctions);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadConjunctions());
  }
}
