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
import { IUsersService } from './services/users.service.base';
import { GroupsState } from './states/groups.state';
import { IGroupsService } from './services/groups.service.base';
import { GroupsService } from './services/groups.service';
import { RolesState } from './states/roles.state';
import { IRolesService } from './services/roles.service.base';
import { RolesService } from './services/roles.service';
import { AddNewGroupDialogComponent } from './components/add-new-group-dialog/add-new-group-dialog.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    UsersManagementComponent,
    GroupsManagementComponent,
    RolesManagementComponent,
    AddNewGroupDialogComponent,
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule,
    NgxsModule.forFeature([UsersState, GroupsState, RolesState]),
    NgxsFormPluginModule,
  ],
  providers: [
    { provide: IUsersService, useClass: UsersService },
    { provide: IGroupsService, useClass: GroupsService },
    { provide: IRolesService, useClass: RolesService },
  ],
})
export class AdministrationsModule {}