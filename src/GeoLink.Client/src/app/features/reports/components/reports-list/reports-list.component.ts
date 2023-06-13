import { Component, OnInit } from '@angular/core';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { LogModel } from '../../../logs/models/log.model';
import { Store } from '@ngxs/store';
import { ReportsState } from '../../states/reports.state';
import { Load } from '../../states/reports.action';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
})
export class ReportsListComponent implements OnInit {
  displayedColumns: string[] = [nameof<LogModel>('timestamp'), nameof<LogModel>('type'), nameof<LogModel>('eventInfo')];
  logs$ = this.store.select(ReportsState.getReports);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }
}
