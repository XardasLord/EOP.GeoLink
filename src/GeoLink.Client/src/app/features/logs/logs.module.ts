import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './components/logs/logs.component';
import { LogsStorageConfigComponent } from './components/logs-storage-config/logs-storage-config.component';
import { ILogsStorageConfigService } from './services/logs-storage-config.service.base';
import { LogsStorageConfigService } from './services/logs-storage-config.service';

@NgModule({
  declarations: [LogsComponent, LogsStorageConfigComponent],
  imports: [SharedModule, LogsRoutingModule],
  providers: [{ provide: ILogsStorageConfigService, useClass: LogsStorageConfigService }],
})
export class LogsModule {}
