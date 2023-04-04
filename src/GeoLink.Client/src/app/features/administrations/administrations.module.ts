import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SharedModule } from '../../shared/shared.module';
import { AdministrationComponent } from './components/administration/administration.component';
import { AdministrationRoutingModule } from './administrations-routing.module';
import { UsersState } from './states/users.state';
import { UsersService } from './services/users.service';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { GroupsManagementComponent } from './components/groups-management/groups-management.component';
import { RolesManagementComponent } from './components/roles-management/roles-management.component';
import { GroupsState } from './states/groups.state';
import { GroupsService } from './services/groups.service';
import { RolesState } from './states/roles.state';
import { RolesService } from './services/roles.service';
import { ManagePrivilegesDialogComponent } from './components/manage-privileges-dialog/manage-privileges-dialog.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    UsersManagementComponent,
    GroupsManagementComponent,
    RolesManagementComponent,
    ManagePrivilegesDialogComponent,
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
    NgxsModule.forFeature([UsersState, GroupsState, RolesState]),
    NgxsFormPluginModule,
  ],
  providers: [UsersService, GroupsService, RolesService],
})
export class AdministrationsModule {}
