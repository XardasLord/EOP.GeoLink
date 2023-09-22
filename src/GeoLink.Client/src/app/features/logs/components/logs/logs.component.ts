import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { DownloadAsCsv } from '../../states/logs.action';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent {
  constructor(private store: Store) {}

  downloadAsCsv() {
    this.store.dispatch(new DownloadAsCsv());
  }
}
