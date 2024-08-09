import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Person } from '../../features/swapi/models/person';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/avatar/avatar.js';

@customElement('app-person-card-actions')
export class PersonCardActions extends LitElement {
  @property({ type: Object }) person!: Person;

  static styles = css`
    .person-card-actions {
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      width: 100%;
      gap: 8px;
      padding: 16px 0;
    }

    sl-button::part(base) {
      width: 56px;
      height: 56px;
      border: 0;
    }
    sl-button::part(label) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    sl-icon {
      font-size: 20px;
    }
    .count {
      margin-inline-start: 4px;
      color: #333333;
      font-weight: 600;
      font-size: 14px;
    }
  `;

  render() {
    const actionButtons = [
      { icon: 'film', length: this.person.films.length, color: '#42a5f5' },
      { icon: 'fingerprint', length: this.person.species.length, color: '#66bb6a' },
      { icon: 'car-front', length: this.person.vehicles.length, color: '#ef5350' },
      { icon: 'rocket-fill', length: this.person.starships.length, color: '#ff7043' },
    ];

    return html`
      <div class="person-card-actions">
        ${actionButtons
          .filter(button => button.length)
          .map(
            button => html`
              <sl-button variant="default" circle>
                <sl-icon name=${button.icon} label="Settings" style="color: ${button.color}"></sl-icon>
                ${button.length}
              </sl-button>
            `
          )}
      </div>
    `;
  }
}
