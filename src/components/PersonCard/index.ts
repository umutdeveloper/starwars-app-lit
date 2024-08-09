import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Person } from '../../features/swapi/models/person';

import '@shoelace-style/shoelace/dist/components/avatar/avatar.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '../Card';
import './CardBadge';
import './PersonCardActions';

@customElement('app-person-card')
export class PersonCard extends LitElement {
  @property({ type: Object }) person!: Person;

  static styles = css`
    :host {
      position: relative;
      text-align: center;
    }

    .person-card::part(base) {
      position: relative;
      background-color: #dddddd;
    }

    .person-card::part(body) {
      padding: 0;
    }

    .card-badge::part(base) {
      width: 100%;
      height: 62px;
      color: #ffffff;
      left: 0px;
      right: 0px;
      z-index: 10;
      margin-left: auto;
      margin-right: auto;
      top: 32px;
      position: absolute;
    }

    .card-content {
      background-color: #fff;
      margin-top: 68px;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 20px;
      z-index: 20;
      position: relative;
      padding-top: 0;
      padding-bottom: 16px;
    }

    .avatar {
      margin-top: -30px;
    }

    .avatar::part(base) {
      --size: 64px;
    }

    .description {
      text-transform: uppercase;
      color: #666666;
    }

    .divider {
      --color: var(--sl-color-neutral-200);
      --spacing: 0;
      background: var(--sl-color-neutral-0);
    }
  `;

  getPersonColor(name: string) {
    const colors = ['#42a5f5', '#66bb6a', '#ef5350', '#ff7043'];
    const asciiValue = name.charCodeAt(0);
    const colorIndex = asciiValue % colors.length;
    return colors[colorIndex];
  }

  render() {
    return html`
      <app-card class="person-card">
        <app-card-badge class="card-badge"></app-card-badge>
        <div class="card-content">
          <sl-avatar
            class="avatar"
            style="--sl-color-neutral-400: ${this.getPersonColor(this.person.name)}"
            initials="${this.person.name[0]}"></sl-avatar>
          <div>
            <h3>${this.person.name}</h3>
            <p class="description">${this.person.birthYear} - ${this.person.gender}</p>
          </div>
          <div>
            <sl-tag variant="neutral" pill>Height: ${this.person.height} cm</sl-tag>
            <sl-tag variant="neutral" pill>Mass: ${this.person.mass} kg</sl-tag>
          </div>
        </div>
        <sl-divider class="divider"></sl-divider>
        <app-person-card-actions .person="${this.person}"></app-person-card-actions>
      </app-card>
    `;
  }
}
