import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import SlCard from '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('app-card')
export class Card extends SlCard {
  static styles = [
    SlCard.styles,
    css`
      :host {
        display: block;
      }
      :host::part(base) {
        --sl-shadow-x-small: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
        border: 0;
        border-radius: 16px;
        overflow: hidden;
      }

      :host::part(header) {
        border: 0;
        padding-top: 16px;
        padding-bottom: 0;
      }
    `,
  ];
}
