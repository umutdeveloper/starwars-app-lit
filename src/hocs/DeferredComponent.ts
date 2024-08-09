import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

// Usage:
// <app-deferred-component .disabled="${false}">
//   <div slot="component">Actual Component Content</div>
//   <div slot="placeholder">Loading...</div>
// </app-deferred-component>
@customElement('app-deferred-component')
export class DeferredComponent extends LitElement {
  @property({ type: Boolean }) disabled = false;

  @state() private isInView = false;

  static styles = css`
    :host {
      display: block;
    }
  `;

  private observer?: IntersectionObserver;

  connectedCallback() {
    super.connectedCallback();
    this.observer = new IntersectionObserver(this.handleIntersection, { threshold: 0.1 });
    this.observer.observe(this);
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
    super.disconnectedCallback();
  }

  private handleIntersection: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.isInView = true;
        if (this.observer) {
          this.observer.disconnect();
        }
      }
    });
  };

  render() {
    return html`
      ${this.isInView && !this.disabled
        ? html`
            <slot name="component"></slot>
          `
        : html`
            <slot name="placeholder"></slot>
          `}
    `;
  }
}
