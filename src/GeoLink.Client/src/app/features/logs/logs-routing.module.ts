import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { LogsComponent } from './components/logs/logs.component';
import { LogsStorageConfigState } from './states/logs-storage-config.state';

const routes: Routes = [
  {
    path: '',
    component: LogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxsModule.forFeature([LogsStorageConfigState]), NgxsFormPluginModule],
  exports: [RouterModule],
})
export class LogsRoutingModule {}
