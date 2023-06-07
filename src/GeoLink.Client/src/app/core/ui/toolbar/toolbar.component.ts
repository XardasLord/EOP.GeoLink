import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../../../shared/states/auth.action';
import { AuthState } from '../../../shared/states/auth.state';
import { AlertState } from '../../../shared/states/alert.state';
import { Load } from '../../../shared/states/alert.action';
import { MapObjectStatusTypeEnum } from '../../../shared/models/map-object-status-type.enum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output()
  toggleSideNav: EventEmitter<boolean> = new EventEmitter();
  showAlerts = false;
  user$ = this.store.select(AuthState.getUser);
  alerts$ = this.store.select(AlertState.getAlerts);
  alertsCount$ = this.store.select(AlertState.getAlertsCount);
  public AlertStatus = MapObjectStatusTypeEnum;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  toggleMenu(): void {
    this.toggleSideNav.emit(true);
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }

  toggleAlerts(): void {
    this.showAlerts = !this.showAlerts;
  }

  protected readonly MapObjectStatusTypeEnum = MapObjectStatusTypeEnum;
}
