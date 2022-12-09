import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdministrationComponent } from './components/administration/administration.component';
import { AdministrationRoutingModule } from './administrations-routing.module';
import { UserManagementComponent } from './components/user-management/user-management.component';

@NgModule({
  declarations: [AdministrationComponent, UserManagementComponent],
  imports: [SharedModule, AdministrationRoutingModule],
})
export class AdministrationsModule {}
