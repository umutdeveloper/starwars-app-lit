import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-desktop-menu')
export class DesktopMenu extends LitElement {

  render() {
    return html`
      <h1>Welcome to desk</h1>
    `;
  }
}