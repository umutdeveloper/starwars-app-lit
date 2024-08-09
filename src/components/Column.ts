import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-column')
export class Column extends LitElement {
  static styles = css`
    :host {
      -webkit-box-flex: 0;
      width: 100%;
      padding-left: 16px;
      padding-right: 16px;
      position: relative;
      box-sizing: border-box;
      margin-bottom: 32px;
      display: block;

      @media screen and (min-width: 768px) {
        flex: 0 0 50%;
        max-width: 50%;
      }

      @media screen and (min-width: 992px) {
        flex: 0 0 33.333334%;
        max-width: 33.333334%;
      }
    }
  `;
  render() {
    return html`
      <slot></slot>
    `;
  }
}
