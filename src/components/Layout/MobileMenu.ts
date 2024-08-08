import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-mobile-menu')
export class MobileMenu extends LitElement {

  render() {
    return html`
      <h1>Welcome to mobile</h1>
    `;
  }
}