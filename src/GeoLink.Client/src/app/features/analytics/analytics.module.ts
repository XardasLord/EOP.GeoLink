import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsState } from './states/analytics.state';
import { IAnalyticsService } from './services/analytics.service.base';
import { AnalyticsService } from './services/analytics.service';
import { ConjunctionsComponent } from './components/conjunctions/conjunctions.component';
import { AlgorithmsComponent } from './components/algorithms/algorithms.component';

@NgModule({
  declarations: [AnalyticsComponent, ConjunctionsComponent, AlgorithmsComponent],
  imports: [SharedModule, AnalyticsRoutingModule, NgxsModule.forFeature([AnalyticsState])],
  providers: [{ provide: IAnalyticsService, useClass: AnalyticsService }],
})
export class AnalyticsModule {}
