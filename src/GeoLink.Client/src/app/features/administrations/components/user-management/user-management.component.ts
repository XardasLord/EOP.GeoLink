import { Component } from '@angular/core';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  displayedColumns: string[] = ['name', 'role', 'group'];
  users: UserModel[] = [
    {
      name: 'Krzysztof Świerczyński',
      role: 'Administrator',
      group: 'Admin',
    },
    {
      name: 'Przymysław Mączkowski',
      role: 'Użytkownik',
      group: 'Telco, IT, Pomiary',
    },
    {
      name: 'Arkadiusz Ubych',
      role: 'Użytkownik',
      group: 'Telco',
    },
  ];
}
