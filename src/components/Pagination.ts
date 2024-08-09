import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-pagination')
export class Pagination extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      margin-bottom: 16px;
    }

    sl-button::part(base) {
      text-transform: uppercase;
    }
  `;

  @property({ type: Boolean }) prevDisabled = false;
  @property({ type: Boolean }) nextDisabled = false;

  private handlePrevClick() {
    this.dispatchEvent(new CustomEvent('prev-click'));
  }

  private handleNextClick() {
    this.dispatchEvent(new CustomEvent('next-click'));
  }

  render() {
    return html`
      <sl-button variant="primary" ?disabled="${this.prevDisabled}" @click="${this.handlePrevClick}">
        Previous
      </sl-button>
      <sl-button variant="primary" ?disabled="${this.nextDisabled}" @click="${this.handleNextClick}">Next</sl-button>
    `;
  }
}
