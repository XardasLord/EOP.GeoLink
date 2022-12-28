import { Component } from '@angular/core';

@Component({
  selector: 'app-map-helper-bar',
  templateUrl: './map-helper-bar.component.html',
  styleUrls: ['./map-helper-bar.component.scss'],
})
export class MapHelperBarComponent {
  showObjectFilters = false;

  toogleObjectFilters(): void {
    this.showObjectFilters = !this.showObjectFilters;
  }
}
