import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './components/charts/charts.component';
import { ChartResolver } from './resolvers/charts.resolver';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    resolve: [ChartResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
