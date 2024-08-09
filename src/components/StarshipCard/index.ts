import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { StarShip } from '../../features/swapi/models/transport';

import '../Card';

@customElement('app-starship-card')
export class StarshipCard extends LitElement {
  @property({ type: Object }) starship!: StarShip;

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
        <h2 slot="header">${this.starship.name}</h2>
        <p>
          <strong>Class:</strong>
          ${this.starship.starshipClass}
        </p>
        <div>
          <p>
            <strong>Model:</strong>
            ${this.starship.model}
          </p>
          <p>
            <strong>Manufacturer:</strong>
            ${this.starship.manufacturer}
          </p>
          ${this.starship.costInCredits !== null &&
          html`
            <p>
              <strong>Cost in Credits:</strong>
              ${this.starship.costInCredits}
            </p>
          `}
          ${this.starship.hyperdriveRating !== null &&
          html`
            <p>
              <strong>Hyperdrive Rating:</strong>
              ${this.starship.hyperdriveRating}
            </p>
          `}
          ${this.starship.MGLT !== null &&
          html`
            <p>
              <strong>MGLT:</strong>
              ${this.starship.MGLT}
            </p>
          `}
        </div>
      </app-card>
    `;
  }
}
