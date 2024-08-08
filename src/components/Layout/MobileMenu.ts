import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MENU_ITEMS } from './constants';
import { Router, RouterLocation } from '@vaadin/router';

import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';

@customElement('app-mobile-menu')
export class MobileMenu extends LitElement {
  @property({ type: Boolean }) drawerOpen = false;
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

  private toggleDrawer() {
    const newState = !this.drawerOpen;
    this.dispatchEvent(new CustomEvent('drawer-toggled', { detail: { open: newState } }));
  }

  private handleNavigation(to: string) {
    this.currentPath = to;
    this.toggleDrawer();
    Router.go(to);
  }

  static styles = css`
    .active::part(base) {
      background-color: var(--sl-color-neutral-100);
      color: var(--sl-color-neutral-1000);
    }

    sl-menu-item::part(base) {
      padding: var(--sl-spacing-small) var(--sl-spacing-2x-small);
    }
  `;

  render() {
    return html`
      <nav>
        ${MENU_ITEMS.map(
          item => html`
            <sl-menu-item
              class=${item.to === this.currentPath && 'active'}
              @click=${() => this.handleNavigation(item.to)}>
              ${item.text}
            </sl-menu-item>
          `
        )}
      </nav>
    `;
  }
}
