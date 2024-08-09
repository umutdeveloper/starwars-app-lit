import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Vehicle } from '../../features/swapi/models/transport';

import '../Card';

@customElement('app-vehicle-card')
export class VehicleCard extends LitElement {
  @property({ type: Object }) vehicle!: Vehicle;

  static styles = css`
    h2 {
      margin: 0;
      font-weight: 400;
    }

    p {
      margin: 5px 0;
      color: var(--sl-color-neutral-600);
      font-size: 0.875rem;
    }
  `;

  render() {
    return html`
      <app-card>
        <h2 slot="header">${this.vehicle.name}</h2>
        <div>
          <p>
            <strong>Model:</strong>
            ${this.vehicle.model}
          </p>
          <p>
            <strong>Manufacturer:</strong>
            ${this.vehicle.manufacturer}
          </p>
          ${this.vehicle.costInCredits !== null &&
          html`
            <p>
              <strong>Cost in Credits:</strong>
              ${this.vehicle.costInCredits}
            </p>
          `}
          ${this.vehicle.maxAtmospheringSpeed !== null &&
          html`
            <p>
              <strong>Max Atmosphering Speed:</strong>
              ${this.vehicle.maxAtmospheringSpeed}
            </p>
          `}
        </div>
      </app-card>
    `;
  }
}
