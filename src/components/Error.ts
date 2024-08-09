import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import './SnackBar';

@customElement('app-error')
export class ErrorPage extends LitElement {
  @property({ type: String }) message = '';

  static styles = css`
    :host {
      display: block;
    }
    .container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    p {
      margin-bottom: 32px;
    }
  `;

  private handleHome() {
    const baseHref = import.meta.env.VITE_BASE_HREF;
    window.location.href = baseHref;
  }

  render() {
    return html`
      <app-snackbar severity="danger" message=${this.message}></app-snackbar>
      <div class="container">
        <div>
          <h1>Something went wrong :(</h1>
          <p style="color: #999999;">An unexpected error has occurred. Please try to go to the home page.</p>
          <sl-button variant="primary" @click=${this.handleHome}>Go Homepage</sl-button>
        </div>
      </div>
    `;
  }
}
