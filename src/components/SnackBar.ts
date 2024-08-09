import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@customElement('app-snackbar')
export class SnackBar extends LitElement {
  @property({ type: String }) severity: 'danger' | 'success' = 'success';
  @property({ type: String }) message: string = '';

  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 16px;
      left: 16px;
      width: 100%;
      max-width: 400px;
    }
    sl-alert {
      width: 100%;
    }
  `;

  render() {
    return html`
      <sl-alert variant=${this.severity} open closable>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        <strong>Error Handler</strong>
        <br />
        ${this.message}
      </sl-alert>
    `;
  }
}
