import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { nameof } from '../../../../shared/helpers/name-of.helper';
import { LogModel } from '../../models/log.model';
import { LogsState } from '../../states/logs.state';
import { ChangePage, Load } from '../../states/logs.action';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss'],
})
export class LogsListComponent implements OnInit {
  displayedColumns: string[] = [nameof<LogModel>('timestamp'), nameof<LogModel>('type'), nameof<LogModel>('eventInfo')];
  logs$ = this.store.select(LogsState.getLogs);
  totalItems$ = this.store.select(LogsState.getLogsCount);
  currentPage$ = this.store.select(LogsState.getCurrentPage);
  pageSize$ = this.store.select(LogsState.getPageSize);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  pageChanged(event: PageEvent): void {
    this.store.dispatch(new ChangePage(event));
  }
}
