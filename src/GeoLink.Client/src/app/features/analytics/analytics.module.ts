import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsState } from './states/analytics.state';
import { AnalyticsService } from './services/analytics.service';
import { ConjunctionsComponent } from './components/conjunctions/conjunctions.component';
import { AlgorithmsComponent } from './components/algorithms/algorithms.component';

@NgModule({
  declarations: [AnalyticsComponent, ConjunctionsComponent, AlgorithmsComponent],
  imports: [SharedModule, AnalyticsRoutingModule, NgxsModule.forFeature([AnalyticsState])],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
