import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './components/logs/logs.component';
import { LogsListComponent } from './components/logs-list/logs-list.component';
import { LogsService } from './services/logs.service';
import { LogsState } from './states/logs.state';

@NgModule({
  declarations: [LogsComponent, LogsListComponent],
  imports: [SharedModule, LogsRoutingModule, NgxsModule.forFeature([LogsState])],
  providers: [LogsService],
})
export class LogsModule {}
