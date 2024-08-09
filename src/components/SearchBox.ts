import { LitElement, html, css } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';
import { debounce } from 'lodash';
import { SlInput } from '@shoelace-style/shoelace';
import { sanitizeInput, validateInput } from '../utils/validation';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';

const DEBOUNCE_TIME_MS = 300;

@customElement('app-search-box')
export class SearchBox extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) value = '';

  @query('sl-input') input!: SlInput;

  debouncedOnChange = debounce((value: string) => {
    this.dispatchEvent(new CustomEvent('change', { detail: value }));
  }, DEBOUNCE_TIME_MS);

  static styles = css`
    sl-input::part(base) {
      border-color: #eeeeee;
      border-radius: 16px;
    }
  `;

  handleChange(event: Event) {
    const inputValue = (event.target as SlInput).value || '';
    if (this.disabled) return;

    const sanitizedValue = sanitizeInput(inputValue);
    if (validateInput(sanitizedValue)) {
      this.value = sanitizedValue;
      this.debouncedOnChange(sanitizedValue);
    }
  }

  render() {
    return html`
      <sl-input
        size="large"
        placeholder="Search"
        .value=${this.value}
        @sl-input=${this.handleChange}
        clearable></sl-input>
    `;
  }
}
