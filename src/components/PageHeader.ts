import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-page-header')
export class PageHeader extends LitElement {
  @property({ type: String }) header = '';
  @property({ type: Number }) totalPage = 0;
  @property({ type: Number }) currentPage = 0;

  static styles = css`
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
    }
    .header {
      font-size: var(--sl-font-size-x-large);
      font-weight: 600;
    }
    .page-info {
      color: #999999;
    }
  `;

  render() {
    return html`
      <div class="container">
        <div class="header">${this.header}</div>
        ${this.totalPage > 0
          ? html`
              <div class="page-info">Page ${this.currentPage}/${this.totalPage}</div>
            `
          : ''}
      </div>
    `;
  }
}
