import { Router } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Routes } from './utils/routes';

@customElement('app-root')
export class App extends LitElement {
  render() {
    return html`
      <div id="router-outlet"></div>
    `;
  }

  firstUpdated(): void {
    this._defineRoutes();
  }

  private _defineRoutes() {
    const outlet = this.renderRoot.querySelector('#router-outlet');
    const router = new Router(outlet);
    router.setRoutes([
      {
        path: Routes.Films,
        action: async () => {
          await import('./pages/Films');
        },
        component: 'app-films',
      },
    ]);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': App;
  }
}
