import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './components/logs/logs.component';

@NgModule({
  declarations: [
    LogsComponent
  ],
  imports: [SharedModule, LogsRoutingModule],
})
export class LogsModule {}
