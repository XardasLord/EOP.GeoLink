import { NgModule } from '@angular/core';
import { FilterSettingsComponent } from './components/filter-settings/filter-settings.component';
import { SharedModule } from '../../shared/shared.module';
import { FilterSettingsRoutingModule } from './filter-settings-routing.module';

@NgModule({
  declarations: [FilterSettingsComponent],
  imports: [SharedModule, FilterSettingsRoutingModule],
})
export class FilterSettingsModule {}
