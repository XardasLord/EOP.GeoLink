import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SharedModule } from '../../shared/shared.module';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { ConfigurationRoutingModule } from './configurations-routing.module';
import { HysteresisConfigComponent } from './components/hysteresis-config/hysteresis-config.component';
import { HysteresisConfigState } from './states/hysteresis-config.state';
import { HysteresisConfigService } from './services/hysteresis-config.service';
import { RetentionTimeConfigComponent } from './components/retention-time-config/retention-time-config.component';
import { RetentionTimeConfigService } from './services/retention-time-config.service';
import { RetentionTimeConfigState } from './states/retention-time-config.state';
import { LogsStorageConfigComponent } from './components/logs-storage-config/logs-storage-config.component';
import { LogsStorageConfigState } from './states/logs-storage-config.state';
import { LogsStorageConfigService } from './services/logs-storage-config.service';
import { DiagnosticToolsConfigComponent } from './components/diagnostic-tools-config/diagnostic-tools-config.component';
import { DiagnosticToolsConfigService } from './services/diagnostic-tools-config.service';
import { DiagnosticToolsConfigState } from './states/diagnostic-tools-config.state';
import { StatusesConfigComponent } from './components/statuses-config/statuses-config.component';
import { EditStatusConfigDialogComponent } from './components/dialogs/edit-status-config-dialog/edit-status-config-dialog.component';
import { StatusesConfigState } from './states/statuses-config.state';
import { StatusesConfigService } from './services/statuses-config.service';

@NgModule({
  declarations: [
    ConfigurationsComponent,
    HysteresisConfigComponent,
    RetentionTimeConfigComponent,
    LogsStorageConfigComponent,
    DiagnosticToolsConfigComponent,
    StatusesConfigComponent,
    EditStatusConfigDialogComponent,
  ],
  imports: [
    SharedModule,
    ConfigurationRoutingModule,
    NgxsModule.forFeature([
      HysteresisConfigState,
      RetentionTimeConfigState,
      LogsStorageConfigState,
      DiagnosticToolsConfigState,
      StatusesConfigState,
    ]),
    NgxsFormPluginModule,
  ],
  providers: [
    HysteresisConfigService,
    RetentionTimeConfigService,
    LogsStorageConfigService,
    DiagnosticToolsConfigService,
    StatusesConfigService,
  ],
})
export class ConfigurationsModule {}
