import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadAvailableAnalytics } from '../../states/analytics.action';
import { AnalyticsState } from '../../states/analytics.state';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {
  availableAnalytics$ = this.store.select(AnalyticsState.getAvailableAnalytics);

  constructor(private store: Store) {
    this.store.dispatch(new LoadAvailableAnalytics());
  }
}
