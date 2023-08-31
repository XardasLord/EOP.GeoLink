import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ChartsComponent } from './components/charts/charts.component';
import { SharedModule } from '../../shared/shared.module';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsHelperBarComponent } from './components/charts-helper-bar/charts-helper-bar.component';

@NgModule({
  declarations: [ChartsComponent, ChartsHelperBarComponent],
  imports: [SharedModule, ChartsRoutingModule, NgxsModule.forFeature([])],
})
export class ChartsModule {}
