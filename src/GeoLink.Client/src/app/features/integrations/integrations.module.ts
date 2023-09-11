import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { IntegrationsRoutingModule } from './integrations-routing.module';
import { SystemsAvailabilityListComponent } from './components/systems-availability-list/systems-availability-list.component';
import { SystemsAvailabilityService } from './services/systems-availability.service';
import { SystemsAvailabilityState } from './states/systems-availability.state';
import { SystemsDataFieldsListComponent } from './components/systems-data-fields-list/systems-data-fields-list.component';

@NgModule({
  declarations: [
    IntegrationsComponent,
    SystemsAvailabilityListComponent,
    SystemsDataFieldsListComponent,
    SystemsDataFieldsListComponent,
  ],
  imports: [SharedModule, IntegrationsRoutingModule, NgxsModule.forFeature([SystemsAvailabilityState])],
  providers: [SystemsAvailabilityService],
})
export class IntegrationsModule {}
