import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import './hocs/ErrorBoundary';

@customElement('app-root')
export class App extends LitElement {
  render() {
    return html`
      <app-error-boundary>
        <slot></slot>
      </app-error-boundary>
    `;
  }
}
