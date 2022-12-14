import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { AdministrationComponent } from './components/administration/administration.component';
import { AdministrationRoutingModule } from './administrations-routing.module';
import { AdministrationsState } from './state/administrations.state';
import { UsersService } from './services/users.service';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { GroupsManagementComponent } from './components/groups-management/groups-management.component';
import { RolesManagementComponent } from './components/roles-management/roles-management.component';
import { IUsersService } from './services/users.service.base';

@NgModule({
  declarations: [
    AdministrationComponent,
    UsersManagementComponent,
    GroupsManagementComponent,
    RolesManagementComponent,
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
    NgxsModule.forFeature([AdministrationsState]),
  ],
  providers: [{ provide: IUsersService, useClass: UsersService }],
})
export class AdministrationsModule {}
