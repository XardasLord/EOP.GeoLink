import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { ConfigurationRoutingModule } from './configurations-routing.module';

@NgModule({
  declarations: [ConfigurationsComponent],
  imports: [SharedModule, ConfigurationRoutingModule],
})
export class ConfigurationsModule {}
