import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { lazy } from '../../utils/lazy';

import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-layout')
export class Layout extends LitElement {
  @state()
  private drawerOpen = false;

  @state()
  private isMobile = false;

  private mediaQueryList: MediaQueryList;

  constructor() {
    super();
    this.mediaQueryList = window.matchMedia('(max-width: 720px)');
    this.isMobile = this.mediaQueryList.matches;
    this.handleMediaQueryChange = this.handleMediaQueryChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.mediaQueryList.addEventListener('change', this.handleMediaQueryChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mediaQueryList.removeEventListener('change', this.handleMediaQueryChange);
  }

  private handleMediaQueryChange(event: MediaQueryListEvent) {
    this.isMobile = event.matches;
  }

  private async toggleDrawer() {
    await lazy(() => import('@shoelace-style/shoelace/dist/components/drawer/drawer.js'));
    await lazy(() => import('./MobileMenu'));
    this.drawerOpen = !this.drawerOpen;
  }

  static styles = css`
    .header {
      display: flex;
      align-items: center;
      padding: 16px;
      background-color: var(--sl-color-primary-500);
      color: white;
      box-shadow: none;
      position: sticky;
      top: 0;
      z-index: 600;
      height: 36px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
      font-weight: 700;
      flex-grow: 1;
    }
    sl-icon-button::part(base) {
      color: white !important;
    }
    sl-drawer::part(panel) {
      --size: 180px;
    }
  `;

  render() {
    return html`
      <div class="header">
        ${this.isMobile
          ? html`
              <sl-icon-button
                name="list"
                label="Menu"
                style="font-size: 24px"
                @click="${this.toggleDrawer}"></sl-icon-button>
            `
          : ''}
        <div class="logo">
          <sl-icon name="rocket"></sl-icon>
          StarWars
        </div>
        ${!this.isMobile
          ? html`
              <app-desktop-menu></app-desktop-menu>
            `
          : ''}
      </div>
      ${this.isMobile
        ? html`
            <sl-drawer
              label="Menu"
              placement="start"
              no-header="true"
              ?open="${this.drawerOpen}"
              @sl-after-hide="${() => (this.drawerOpen = false)}">
              <app-mobile-menu></app-mobile-menu>
            </sl-drawer>
          `
        : ''}
      <slot></slot>
    `;
  }
}
