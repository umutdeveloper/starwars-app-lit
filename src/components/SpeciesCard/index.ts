import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Species } from '../../features/swapi/models/species';

import '../Card';

@customElement('app-species-card')
export class SpeciesCard extends LitElement {
  @property({ type: Object }) species!: Species;

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
        <h2 slot="header">${this.species.name}</h2>
        <p>
          <strong>Designation:</strong>
          ${this.species.designation}
        </p>
        ${this.species.averageHeight !== null &&
        html`
          <p>
            <strong>Average Height:</strong>
            ${this.species.averageHeight}
          </p>
        `}
        ${this.species.averageLifespan !== null &&
        html`
          <p>
            <strong>Average Lifespan:</strong>
            ${this.species.averageLifespan}
          </p>
        `}
        <p>
          <strong>Classification:</strong>
          ${this.species.classification}
        </p>
        ${this.species.eyeColors.length > 0 &&
        html`
          <p>
            <strong>Eye Colors:</strong>
            ${this.species.eyeColors.join(', ')}
          </p>
        `}
        ${this.species.hairColors.length > 0 &&
        html`
          <p>
            <strong>Hair Colors:</strong>
            ${this.species.hairColors.join(', ')}
          </p>
        `}
        ${this.species.skinColors.length > 0 &&
        html`
          <p>
            <strong>Skin Colors:</strong>
            ${this.species.skinColors.join(', ')}
          </p>
        `}
      </app-card>
    `;
  }
}
