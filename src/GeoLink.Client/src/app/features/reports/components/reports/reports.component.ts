import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { RequestForCsvReport } from '../../states/reports.action';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  constructor(private store: Store) {}

  downloadAsCsv() {
    this.store.dispatch(new RequestForCsvReport());
  }
}
