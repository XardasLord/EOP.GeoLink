import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from '../ui/navigation/navigation.component';

export const RoutePaths = {
  Auth: 'auth',
  Map: 'map',
  Administration: 'administration',
  Configuration: 'configuration',
  Filters: 'filters',
  Logs: 'logs',
  Analytics: 'analytics',
  Reports: 'reports',
};

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: RoutePaths.Map,
        loadChildren: () => import('../../features/maps/maps.module').then(m => m.MapsModule),
      },
      {
        path: RoutePaths.Reports,
        loadChildren: () => import('../../features/reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: RoutePaths.Administration,
        loadChildren: () =>
          import('../../features/administrations/administrations.module').then(m => m.AdministrationsModule),
      },
      {
        path: RoutePaths.Configuration,
        loadChildren: () =>
          import('../../features/configurations/configurations.module').then(m => m.ConfigurationsModule),
      },
      {
        path: RoutePaths.Filters,
        loadChildren: () =>
          import('../../features/filter-settings/filter-settings.module').then(m => m.FilterSettingsModule),
      },
      {
        path: RoutePaths.Logs,
        loadChildren: () => import('../../features/logs/logs.module').then(m => m.LogsModule),
      },
      {
        path: RoutePaths.Analytics,
        loadChildren: () => import('../../features/analytics/analytics.module').then(m => m.AnalyticsModule),
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
