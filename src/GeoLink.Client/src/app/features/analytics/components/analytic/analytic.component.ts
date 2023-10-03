import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { distinct, map, mergeMap, Observable } from 'rxjs';
import { ChangePage, LoadAnalytic } from '../../states/analytics.action';
import { AnalyticsState } from '../../states/analytics.state';
import { MapObjectStatusTypeEnum } from 'src/app/shared/models/map-object-status-type.enum';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss'],
})
export class AnalyticComponent implements OnInit {
  @Input() analyticId!: number;

  analytic$ = this.store.select(AnalyticsState.getAnalytic);
  loading$ = this.store.select(AnalyticsState.getIsLoading);
  totalItems$ = this.store.select(AnalyticsState.getTotalItems);
  currentPage$ = this.store.select(AnalyticsState.getCurrentPage);
  pageSize$ = this.store.select(AnalyticsState.getPageSize);

  displayedColumns$: Observable<string[]> = this.analytic$.pipe(
    mergeMap(x => x.data.map(d => d.cells.map(c => c.header))),
    distinct()
  );

  dataSource!: Observable<TableRow[]>;

  analyticDynamicData$ = this.store.select(AnalyticsState.getAnalyticData);

  protected readonly DeviceStatus = MapObjectStatusTypeEnum;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadAnalytic(this.analyticId, true));

    this.dataSource = this.analyticDynamicData$.pipe(
      map(data =>
        data.map(row =>
          row.reduce((acc: TableRow, cell) => {
            acc[cell.header] = {
              isStatus: cell.isStatus,
              value: cell.value,
            };
            return acc;
          }, {})
        )
      )
    );
  }

  pageChanged(event: PageEvent): void {
    this.store.dispatch(new ChangePage(this.analyticId, event));
  }
}

interface TableRow {
  [key: string]: CellValueDetail;
}

interface CellValueDetail {
  isStatus: boolean;
  value: string | number;
}
