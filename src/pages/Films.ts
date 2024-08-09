import { html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import store, { ConnectedLitElement, RootState } from '../store';
import { films, people, SliceDetails, SliceName } from '../features/swapi/swapiSlices';
import { Film } from '../features/swapi/models/film';
import { createSelector } from '@reduxjs/toolkit';
import { SwapiListPage } from '../hocs/SwapiListPage';

import '../hocs/DeferredComponent';
import '../components/FilmCard';
import '../components/FilmCard/FilmCardPlaceholder';
import '../components/Grid';
import '../components/Column';

const PLACEHOLDER_ITEMS = [0, 1, 2];
const selectPeopleResults = (state: RootState) => state.swapi.people.results;
const selectPeopleNamesForFilm = (film: Film) =>
  createSelector([selectPeopleResults], results => {
    const filteredList = film.characters.filter(char => !!results[char]);
    return filteredList.length === film.characters.length
      ? filteredList.map(char => results[char].name).join(', ')
      : '';
  });

@customElement('app-film-item')
export class FilmItem extends ConnectedLitElement {
  @property({ type: Boolean }) isPending = false;
  @property({ type: Object }) film!: Film;
  @state() peopleNames: string = '';

  stateChanged(state: RootState) {
    this.peopleNames = selectPeopleNamesForFilm(this.film)(state);
  }

  requestPeopleNames() {
    this.film.characters.forEach(char => {
      store.dispatch(people.requestItem(char));
    });
  }

  render() {
    return html`
      <app-deferred-component ?disabled=${this.isPending}>
        <app-film-card-placeholder slot="placeholder"></app-film-card-placeholder>
        <app-film-card
          slot="component"
          .film=${this.film}
          peopleNames="${this.peopleNames}"
          @request-people-names=${this.requestPeopleNames}></app-film-card>
      </app-deferred-component>
    `;
  }
}

@customElement('app-films')
export class FilmsPage extends SwapiListPage<Film> {
  sliceDetails: SliceDetails<Film> = films;
  sliceName: SliceName = 'films';
  header: string = 'Films';

  disconnectedCallback(): void {
    store.dispatch(people.clearRequestList());
    super.disconnectedCallback();
  }

  renderPlaceholder(): TemplateResult<1> {
    return html`
      <app-grid>
        ${PLACEHOLDER_ITEMS.map(
          () => html`
            <app-column><app-film-card-placeholder></app-film-card-placeholder></app-column>
          `
        )}
      </app-grid>
    `;
  }
  renderList(): TemplateResult<1> {
    return html`
      <app-grid>
        ${this.pageResults.map(
          film => html`
            <app-column><app-film-item .film=${film} ?isPending=${this.isPending}></app-film-item></app-column>
          `
        )}
      </app-grid>
    `;
  }
}
