import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReportRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [SharedModule, ReportRoutingModule],
  providers: [],
})
export class ReportsModule {}
