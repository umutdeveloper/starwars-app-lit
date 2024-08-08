import { Router } from '@vaadin/router';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath(import.meta.env.PROD ? '/assets/shoelace' : '/node_modules/@shoelace-style/shoelace/dist');

import './index.css';
import './app';
import routes from './app.routes';

const routerOutlet = document.querySelector('app-root');
const router = new Router(routerOutlet);
router.setRoutes(routes);
