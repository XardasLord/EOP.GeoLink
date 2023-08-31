import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ChartsComponent } from './components/charts/charts.component';
import { SharedModule } from '../../shared/shared.module';
import { ChartsRoutingModule } from './charts-routing.module';

@NgModule({
  declarations: [ChartsComponent],
  imports: [SharedModule, ChartsRoutingModule, NgxsModule.forFeature([])],
})
export class ChartsModule {}
