import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { API } from './services/api.service';
import { isAuthorised, isUnauthorized } from './guards/auth.guard';
import { map } from 'rxjs';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component'),
        canMatch: [isUnauthorized],
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        canMatch: [isAuthorised],
        resolve: {
          username: () => inject(API).getWhoami().pipe(map(whoami => whoami.username))
        }
      }
    ]
  }
];
