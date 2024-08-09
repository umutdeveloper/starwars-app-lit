import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-card-badge')
export class CardBadge extends LitElement {
  render() {
    return html`
      <svg part="base" fill="none" viewBox="0 0 144 62" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#ffffff"
          d="m111.34 23.88c-10.62-10.46-18.5-23.88-38.74-23.88h-1.2c-20.24 0-28.12 13.42-38.74 23.88-7.72 9.64-19.44 11.74-32.66 12.12v26h144v-26c-13.22-.38-24.94-2.48-32.66-12.12z"></path>
      </svg>
    `;
  }
}
