import { html, css, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { Base, SwapiState } from '../features/swapi/models/base';
import { SliceDetails, SliceName } from '../features/swapi/swapiSlices';
import store, { ConnectedLitElement, RootState } from '../store';
import { APIStatus } from '../models/types';
import { createSwapiListMapToStateProps } from '../features/swapi/utils';

import '../components/PageHeader';
import '../components/SearchBox';
import '../components/Pagination';

export interface SwapiListPageProps<T> {
  pageResults: T[];
  hasPrev: boolean | null;
  hasNext: boolean | null;
  count: number;
  pagination: { page: number; search: string; pageSize: number };
  status: APIStatus;
  error: string | null;
}

export abstract class SwapiListPage<T extends Base> extends ConnectedLitElement {
  abstract sliceDetails: SliceDetails<T>;
  abstract sliceName: SliceName;
  abstract header: string;
  @state() isPending!: boolean;
  @state() isPendingForNoItems!: boolean;
  @state() isNotFound!: boolean;
  @state() totalPage!: number;
  @state() count!: number;
  @state() hasNext!: boolean | null;
  @state() hasPrev!: boolean | null;
  @state() pageResults!: T[];
  @state() pagination!: SwapiState<T>['pagination'];
  @state() status!: APIStatus;
  @state() error!: string | null;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    h3 {
      text-align: center;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    store.dispatch(this.sliceDetails.fetchList(this.pagination));
  }

  disconnectedCallback() {
    store.dispatch(this.sliceDetails.reset());
    super.disconnectedCallback();
  }

  stateChanged(state: RootState): void {
    const props = createSwapiListMapToStateProps<Base>(state => state.swapi[this.sliceName] as SwapiState<Base>)(state);
    this.error = props.error;
    if (this.error) {
      throw new Error(this.error);
    }
    this.count = props.count;
    this.hasNext = props.hasNext;
    this.hasPrev = props.hasPrev;
    this.pageResults = props.pageResults as T[];
    this.pagination = props.pagination;
    this.status = props.status;
    this.isPending = this.status === 'loading';
    this.isPendingForNoItems = !this.pageResults.length && this.isPending;
    this.isNotFound = !this.pageResults.length && !this.isPending && this.status !== 'idle';
    this.totalPage =
      this.count % this.pagination.pageSize === 0
        ? this.count / this.pagination.pageSize
        : Math.floor(this.count / this.pagination.pageSize) + 1;
  }

  handleSearchQueryChange(e: CustomEvent) {
    store.dispatch(this.sliceDetails.search(e.detail));
    this.fetchList();
  }

  goPreviousPage() {
    store.dispatch(this.sliceDetails.prevPage());
    this.fetchList();
  }

  goNextPage() {
    store.dispatch(this.sliceDetails.nextPage());
    this.fetchList();
  }

  private fetchList() {
    store.dispatch(this.sliceDetails.fetchList(this.pagination));
    window.scrollTo(0, 0);
  }

  abstract renderPlaceholder(): TemplateResult<1>;
  abstract renderList(): TemplateResult<1>;

  render() {
    return html`
      <app-page-header
        header="${`${this.header} List (${this.count} ${this.count > 1 ? 'items' : 'item'})`}"
        totalPage="${this.totalPage}"
        currentPage="${this.pagination.page}"></app-page-header>
      <app-search-box ?disabled=${this.isPending} @change=${this.handleSearchQueryChange}></app-search-box>
      ${this.isPendingForNoItems ? this.renderPlaceholder() : ''}
      ${this.isNotFound
        ? html`
            <h3>No Items Found</h3>
          `
        : ''}
      ${this.pageResults.length !== 0 ? this.renderList() : ''}
      ${this.totalPage > 1
        ? html`
            <app-pagination
              ?prevDisabled=${!this.hasPrev || this.isPending}
              ?nextDisabled=${!this.hasNext || this.isPending}
              @prev-click=${this.goPreviousPage}
              @next-click=${this.goNextPage}></app-pagination>
          `
        : ''}
    `;
  }
}
