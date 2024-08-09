import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-grid')
export class Grid extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      margin-left: -16px;
      margin-right: -16px;
      box-sizing: border-box;
    }
  `;
  render() {
    return html`
      <slot></slot>
    `;
  }
}
