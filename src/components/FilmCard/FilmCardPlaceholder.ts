import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';

@customElement('app-film-card-placeholder')
export class FilmCardPlaceholder extends LitElement {
  static styles = css`
    sl-skeleton {
      --border-radius: 8px;
      width: 100%;
      height: 447px;
    }
  `;

  render() {
    return html`
      <sl-skeleton class="placeholder" effect="sheen"></sl-skeleton>
    `;
  }
}
