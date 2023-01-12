import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SharedModule } from '../../shared/shared.module';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { ConfigurationRoutingModule } from './configurations-routing.module';
import { HysteresisConfigComponent } from './components/hysteresis-config/hysteresis-config.component';
import { HysteresisConfigState } from './states/hysteresis-config.state';
import { IHysteresisConfigService } from './services/hysteresis-config.service.base';
import { HysteresisConfigService } from './services/hysteresis-config.service';
import { RetentionTimeConfigComponent } from './components/retention-time-config/retention-time-config.component';
import { IRetentionTimeConfigService } from './services/retention-time-config.service.base';
import { RetentionTimeConfigService } from './services/retention-time-config.service';
import { RetentionTimeConfigState } from './states/retention-time-config.state';

@NgModule({
  declarations: [ConfigurationsComponent, HysteresisConfigComponent, RetentionTimeConfigComponent],
  imports: [
    SharedModule,
    ConfigurationRoutingModule,
    NgxsModule.forFeature([HysteresisConfigState, RetentionTimeConfigState]),
    NgxsFormPluginModule,
  ],
  providers: [
    { provide: IHysteresisConfigService, useClass: HysteresisConfigService },
    { provide: IRetentionTimeConfigService, useClass: RetentionTimeConfigService },
  ],
})
export class ConfigurationsModule {}
