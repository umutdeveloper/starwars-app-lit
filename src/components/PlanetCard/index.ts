import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Planet } from '../../features/swapi/models/planet';

import '../Card';

@customElement('app-planet-card')
export class PlanetCard extends LitElement {
  @property({ type: Object }) planet!: Planet;

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
        <h2 slot="header">${this.planet.name}</h2>
        <p>
          <strong>Gravity:</strong>
          ${this.planet.gravity}
        </p>
        <div>
          <p>
            <strong>Climate:</strong>
            ${this.planet.climate}
          </p>
          ${this.planet.population !== null &&
          html`
            <p>
              <strong>Population:</strong>
              ${this.planet.population}
            </p>
          `}
          ${this.planet.orbitalPeriod !== null &&
          html`
            <p>
              <strong>Orbital Period:</strong>
              ${this.planet.orbitalPeriod}
            </p>
          `}
          ${this.planet.rotationPeriod !== null &&
          html`
            <p>
              <strong>Rotation Period:</strong>
              ${this.planet.rotationPeriod}
            </p>
          `}
        </div>
      </app-card>
    `;
  }
}
