import { Component } from '@angular/core';

@Component({
  selector: 'app-reports-helper-bar',
  templateUrl: './reports-helper-bar.component.html',
  styleUrls: ['./reports-helper-bar.component.scss'],
})
export class ReportsHelperBarComponent {
  showObjectFilters = false;
  showAreaFilters = false;

  toggleObjectFilters(): void {
    this.showObjectFilters = !this.showObjectFilters;
  }

  toggleAreaFilters(): void {
    this.showAreaFilters = !this.showAreaFilters;
  }
}
