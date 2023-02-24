import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { Logout } from '../../../shared/states/auth.action';
import { AuthState } from '../../../shared/states/auth.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output()
  toggleSideNav: EventEmitter<boolean> = new EventEmitter();
  user$ = this.store.select(AuthState.getUser);
  environmentName = environment.environmentName;

  constructor(private store: Store) {
    console.log('environment - ', this.environmentName);
  }

  toggleMenu(): void {
    this.toggleSideNav.emit(true);
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
