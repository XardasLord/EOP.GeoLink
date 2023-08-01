import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from '../ui/navigation/navigation.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from '../ui/login/login/login.component';
import { LoginScreenGuard } from '../guards/login-screen.guard';

export const RoutePaths = {
  Auth: 'auth',
  Login: 'login',
  Map: 'map',
  Administration: 'administration',
  Configuration: 'configuration',
  Filters: 'filters',
  Logs: 'logs',
  Analytics: 'analytics',
  Reports: 'reports',
  Integrations: 'integrations',
};

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: RoutePaths.Map,
        pathMatch: 'full',
      },
      {
        path: RoutePaths.Map,
        loadChildren: () => import('../../features/maps/maps.module').then(m => m.MapsModule),
        canActivate: [AuthGuard],
      },
      {
        path: RoutePaths.Reports,
        loadChildren: () => import('../../features/reports/reports.module').then(m => m.ReportsModule),
        canActivate: [AuthGuard],
      },
      {
        path: RoutePaths.Administration,
        loadChildren: () =>
          import('../../features/administrations/administrations.module').then(m => m.AdministrationsModule),
        canActivate: [AuthGuard],
      },
      {
        path: RoutePaths.Configuration,
        loadChildren: () =>
          import('../../features/configurations/configurations.module').then(m => m.ConfigurationsModule),
        canActivate: [AuthGuard],
      },
      {
        path: RoutePaths.Filters,
        loadChildren: () =>
          import('../../features/filter-settings/filter-settings.module').then(m => m.FilterSettingsModule),
        canActivate: [AuthGuard],
      },
      {
        path: RoutePaths.Logs,
        loadChildren: () => import('../../features/logs/logs.module').then(m => m.LogsModule),
        canActivate: [AuthGuard],
      },
      {
        path: RoutePaths.Analytics,
        loadChildren: () => import('../../features/analytics/analytics.module').then(m => m.AnalyticsModule),
        canActivate: [AuthGuard],
      },
      {
        path: RoutePaths.Integrations,
        loadChildren: () => import('../../features/integrations/integrations.module').then(m => m.IntegrationsModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: RoutePaths.Login,
    component: LoginComponent,
    canActivate: [LoginScreenGuard],
  },
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
