import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { MENU_ITEMS } from './constants';
import { Router, RouterLocation } from '@vaadin/router';

import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-desktop-menu')
export class DesktopMenu extends LitElement {
  @state() currentPath = window.location.pathname;

  constructor() {
    super();
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('vaadin-router-location-changed', this.handleLocationChange);
  }

  disconnectedCallback() {
    window.removeEventListener('vaadin-router-location-changed', this.handleLocationChange);
    super.disconnectedCallback();
  }

  private handleLocationChange(
    event: CustomEvent<{
      router: Router;
      location: RouterLocation;
    }>
  ) {
    this.currentPath = event.detail.location.pathname;
  }

  private handleNavigation(to: string) {
    this.currentPath = to;
    Router.go(to);
  }

  static styles = css`
    .active::part(base),
    sl-button::part(base):hover {
      background-color: var(--sl-color-primary-600);
      transition: background-color ease-in-out 100ms;
    }

    sl-button::part(base) {
      color: var(--sl-color-neutral-100);
      text-transform: uppercase;
    }
  `;

  render() {
    return html`
      <nav>
        ${MENU_ITEMS.map(
          item => html`
            <sl-button
              variant="text"
              href="${item.to}"
              class=${item.to === this.currentPath && 'active'}
              @click=${() => this.handleNavigation(item.to)}
              pill
              outline>
              ${item.text}
            </sl-button>
          `
        )}
      </nav>
    `;
  }
}
