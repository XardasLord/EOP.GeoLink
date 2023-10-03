import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsState } from './states/analytics.state';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticComponent } from './components/analytic/analytic.component';

@NgModule({
  declarations: [AnalyticsComponent, AnalyticComponent],
  imports: [SharedModule, AnalyticsRoutingModule, NgxsModule.forFeature([AnalyticsState])],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
