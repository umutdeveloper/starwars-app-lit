import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-root')
export class App extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}
