import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './components/logs/logs.component';
import { LogsStorageConfigComponent } from './components/logs-storage-config/logs-storage-config.component';
import { ILogsStorageConfigService } from './services/logs-storage-config.service.base';
import { LogsStorageConfigService } from './services/logs-storage-config.service';
import { LogsListComponent } from './components/logs-list/logs-list.component';
import { ILogsService } from './services/logs.service.base';
import { LogsService } from './services/logs.service';
import { NgxsModule } from '@ngxs/store';
import { LogsState } from './states/logs.state';
import { LogsStorageConfigState } from './states/logs-storage-config.state';

@NgModule({
  declarations: [LogsComponent, LogsStorageConfigComponent, LogsListComponent],
  imports: [SharedModule, LogsRoutingModule, NgxsModule.forFeature([LogsState, LogsStorageConfigState])],
  providers: [
    { provide: ILogsStorageConfigService, useClass: LogsStorageConfigService },
    { provide: ILogsService, useClass: LogsService },
  ],
})
export class LogsModule {}
