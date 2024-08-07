import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-films')
export class FilmsPage extends LitElement {
  static styles = css`
    /* Your styles here */
  `;

  render() {
    return html`
      <h1>Welcome to the Films Page</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-films': FilmsPage;
  }
}
