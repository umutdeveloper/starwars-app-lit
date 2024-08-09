import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';

@customElement('app-vehicle-card-placeholder')
export class VehicleCardPlaceholder extends LitElement {
  static styles = css`
    sl-skeleton {
      --border-radius: 8px;
      width: 100%;
      height: 227px;
    }
  `;

  render() {
    return html`
      <sl-skeleton class="placeholder" effect="sheen"></sl-skeleton>
    `;
  }
}
