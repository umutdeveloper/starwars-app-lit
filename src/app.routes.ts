import { Route } from '@vaadin/router';
import { Routes } from './utils/routes';

const routes: Route[] = [
  {
    path: '/',
    component: 'app-layout',
    action: async () => {
      await import('./components/Layout');
    },
    children: [
      {
        path: '/',
        redirect: Routes.People
      },
      {
        path: Routes.People,
        action: async () => {
          await import('./pages/People');
        },
        component: 'app-people',
      },
      {
        path: Routes.Films,
        action: async () => {
          await import('./pages/Films');
        },
        component: 'app-films',
      },
      {
        path: Routes.Planets,
        action: async () => {
          await import('./pages/Planets');
        },
        component: 'app-planets',
      },
      {
        path: Routes.Species,
        action: async () => {
          await import('./pages/Species');
        },
        component: 'app-species',
      },
      {
        path: Routes.Starships,
        action: async () => {
          await import('./pages/Starships');
        },
        component: 'app-starships',
      },
      {
        path: Routes.Vehicles,
        action: async () => {
          await import('./pages/Vehicles');
        },
        component: 'app-vehicles',
      },
    ],
  },
];

export default routes;
