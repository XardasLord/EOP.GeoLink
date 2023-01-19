import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { LogModel } from '../../models/log.model';
import { LogsState } from '../../states/logs.state';
import { Load } from '../../states/logs.action';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss'],
})
export class LogsListComponent implements OnInit {
  displayedColumns: string[] = [nameof<LogModel>('date'), nameof<LogModel>('category'), nameof<LogModel>('message')];
  logs$ = this.store.select(LogsState.getLogs);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }
}
