import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../components/Error';

@customElement('app-error-boundary')
export class ErrorBoundary extends LitElement {
  @state() hasError = false;
  @state() message = '';

  static styles = css`
    :host {
      display: block;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.onunhandledrejection = this.handleError.bind(this);
  }

  private async handleError(event: PromiseRejectionEvent) {
    this.hasError = true;
    this.message = event.reason.message;
    console.error('Uncaught error:', event);
    event.preventDefault();
  }

  render() {
    if (this.hasError) {
      return html`
        <app-error .message=${this.message}></app-error>
      `;
    }

    return html`
      <slot></slot>
    `;
  }
}
