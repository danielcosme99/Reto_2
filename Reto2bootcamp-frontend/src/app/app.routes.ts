import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthGuard } from './core/guards/notauth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    canActivate: [NotAuthGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) }
    ],
  },
  //{
    //path: '',
    //component: MainLayoutComponent,
    //canActivate: [AuthGuard],
    //children: [
      //{ path: 'hospital', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) }
    //],
  //},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'distrito', loadComponent: () => import('./pages/distrito/distrito.component').then(m => m.DistritoComponent) }
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'sede', loadComponent: () => import('./pages/sede/sede.component').then(m => m.SedeComponent) }
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'gerente', loadComponent: () => import('./pages/gerente/gerente.component').then(m => m.GerenteComponent) }
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'condicion', loadComponent: () => import('./pages/condicion/condicion.component').then(m => m.CondicionComponent) }
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'provincia', loadComponent: () => import('./pages/provincia/provincia.component').then(m => m.ProvinciaComponent) }
    ],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
