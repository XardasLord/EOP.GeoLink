import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ChartsComponent } from './components/charts/charts.component';
import { SharedModule } from '../../shared/shared.module';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsHelperBarComponent } from './components/charts-helper-bar/charts-helper-bar.component';
import { ChartsState } from './states/charts.state';
import { SingleDataChartComponent } from './components/single-data-chart/single-data-chart.component';

@NgModule({
  declarations: [ChartsComponent, ChartsHelperBarComponent, SingleDataChartComponent],
  imports: [SharedModule, ChartsRoutingModule, NgxsModule.forFeature([ChartsState])],
})
export class ChartsModule {}
