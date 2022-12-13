import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { AdministrationComponent } from './components/administration/administration.component';
import { AdministrationRoutingModule } from './administrations-routing.module';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AdministrationsState } from './state/administrations.state';
import { IAdministrationsService } from './services/administrations.service.base';
import { AdministrationsService } from './services/administrations.service';

@NgModule({
  declarations: [AdministrationComponent, UserManagementComponent],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
    NgxsModule.forFeature([AdministrationsState]),
  ],
  providers: [
    { provide: IAdministrationsService, useClass: AdministrationsService },
  ],
})
export class AdministrationsModule {}
