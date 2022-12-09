import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from '../ui/navigation/navigation.component';

export const RoutePaths = {
  Auth: 'auth',
  Map: 'map',
  Administration: 'administration',
};

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: RoutePaths.Map,
        loadChildren: () =>
          import('../../features/maps/maps.module').then(m => m.MapsModule),
      },
      {
        path: RoutePaths.Administration,
        loadChildren: () =>
          import('../../features/administrations/administrations.module').then(
            m => m.AdministrationsModule
          ),
      },
    ],
  },
  // {
  //   path: RoutePaths.Auth,
  //   component: LoginComponent,
  //   canActivate: [LoginScreenGuard]
  // },
  // {
  //   path: 'auth-callback',
  //   component: AuthCallbackComponent
  // },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
