import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent {
  constructor(private store: Store) {}
}
