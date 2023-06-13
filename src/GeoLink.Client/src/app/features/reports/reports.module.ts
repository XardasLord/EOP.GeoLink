import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { ReportRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportsHelperBarComponent } from './components/reports-helper-bar/reports-helper-bar.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { ReportsState } from './states/reports.state';
import { ReportsService } from './services/reports.service';

@NgModule({
  declarations: [ReportsComponent, ReportsHelperBarComponent, ReportsListComponent],
  imports: [SharedModule, ReportRoutingModule, NgxsModule.forFeature([ReportsState])],
  providers: [ReportsService],
})
export class ReportsModule {}
