import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
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
  Logs: 'logs',
  Analytics: 'analytics',
  Reports: 'reports',
  Integrations: 'integrations',
  Charts: 'charts',
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
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        path: RoutePaths.Reports,
        loadChildren: () => import('../../features/reports/reports.module').then(m => m.ReportsModule),
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        path: RoutePaths.Administration,
        loadChildren: () =>
          import('../../features/administrations/administrations.module').then(m => m.AdministrationsModule),
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        path: RoutePaths.Configuration,
        loadChildren: () =>
          import('../../features/configurations/configurations.module').then(m => m.ConfigurationsModule),
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        path: RoutePaths.Logs,
        loadChildren: () => import('../../features/logs/logs.module').then(m => m.LogsModule),
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        path: RoutePaths.Analytics,
        loadChildren: () => import('../../features/analytics/analytics.module').then(m => m.AnalyticsModule),
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        path: RoutePaths.Integrations,
        loadChildren: () => import('../../features/integrations/integrations.module').then(m => m.IntegrationsModule),
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        path: RoutePaths.Charts,
        loadChildren: () => import('../../features/charts/charts.module').then(m => m.ChartsModule),
        canActivate: mapToCanActivate([AuthGuard]),
      },
    ],
  },
  {
    path: RoutePaths.Login,
    component: LoginComponent,
    canActivate: mapToCanActivate([LoginScreenGuard]),
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
