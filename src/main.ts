import { Router } from '@vaadin/router';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath(import.meta.env.PROD ? '/assets/shoelace' : '/node_modules/@shoelace-style/shoelace/dist');

const BASE_URL = import.meta.env.VITE_BASE_HREF;

import './index.css';
import './app';
import routes from './app.routes';

const routerOutlet = document.querySelector('app-root');
const router = new Router(routerOutlet, { baseUrl: BASE_URL });
router.setRoutes(routes);
