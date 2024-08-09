import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Film } from '../../features/swapi/models/film';

import '../Card';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';

@customElement('app-film-card')
export class FilmCard extends LitElement {
  static styles = css`
    .content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .people {
      display: flex;
      align-items: top;
      gap: 0.25rem;
    }
    p {
      margin: 0;
      color: var(--sl-color-neutral-700);
    }
    .label {
      font-weight: bold;
    }
    h2 {
      margin: 0;
      font-weight: 400;
    }
  `;

  @property({ type: Object }) film!: Film;
  @property({ type: String }) peopleNames = '';

  connectedCallback() {
    super.connectedCallback();
    this.requestPeopleNames();
  }

  requestPeopleNames() {
    const event = new CustomEvent('request-people-names', {
      detail: { film: this.film },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <app-card>
        <h2 slot="header">${this.film.title}</h2>
        <div class="content">
          <p>${this.film.openingCrawl}</p>
          <p>
            <span class="label">Director:</span>
            ${this.film.director}
          </p>
          <p>
            <span class="label">Producer:</span>
            ${this.film.producer}
          </p>
          <p>
            <span class="label">Release Date:</span>
            ${this.film.releaseDate}
          </p>
          <div class="people">
            <span class="label">People:</span>
            ${this.peopleNames
              ? html`
                  <p>${this.peopleNames}</p>
                `
              : html`
                  <sl-skeleton effect="pulse" style="width: 100%; height: 22px; border-radius: 4px;"></sl-skeleton>
                `}
          </div>
        </div>
      </app-card>
    `;
  }
}
