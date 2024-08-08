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
        path: Routes.Films,
        action: async () => {
          await import('./pages/Films');
        },
        component: 'app-films',
      },
    ],
  },
];

export default routes;
