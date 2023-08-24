import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { LogsComponent } from './components/logs/logs.component';

const routes: Routes = [
  {
    path: '',
    component: LogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxsFormPluginModule],
  exports: [RouterModule],
})
export class LogsRoutingModule {}
