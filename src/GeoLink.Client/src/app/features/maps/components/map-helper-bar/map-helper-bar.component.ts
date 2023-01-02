import { Component } from '@angular/core';

@Component({
  selector: 'app-map-helper-bar',
  templateUrl: './map-helper-bar.component.html',
  styleUrls: ['./map-helper-bar.component.scss'],
})
export class MapHelperBarComponent {
  showObjectFilters = false;
  showAreaFilters = false;

  toggleObjectFilters(): void {
    this.showObjectFilters = !this.showObjectFilters;
  }

  toggleAreaFilters(): void {
    this.showAreaFilters = !this.showAreaFilters;
  }
}
