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

@NgModule({
  declarations: [ConfigurationsComponent, HysteresisConfigComponent],
  imports: [
    SharedModule,
    ConfigurationRoutingModule,
    NgxsModule.forFeature([HysteresisConfigState]),
    NgxsFormPluginModule,
  ],
  providers: [{ provide: IHysteresisConfigService, useClass: HysteresisConfigService }],
})
export class ConfigurationsModule {}
