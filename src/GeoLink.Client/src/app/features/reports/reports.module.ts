import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReportRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportsHelperBarComponent } from './components/reports-helper-bar/reports-helper-bar.component';

@NgModule({
  declarations: [ReportsComponent, ReportsHelperBarComponent],
  imports: [SharedModule, ReportRoutingModule],
  providers: [],
})
export class ReportsModule {}
