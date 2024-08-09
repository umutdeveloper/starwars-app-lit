import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Person } from '../features/swapi/models/person';
import { SwapiListPage } from '../hocs/SwapiListPage';
import { people, SliceDetails, SliceName } from '../features/swapi/swapiSlices';

import '../hocs/DeferredComponent';
import '../components/PersonCard';
import '../components/PersonCard/PersonCardPlaceholder';
import '../components/Grid';
import '../components/Column';

const PLACEHOLDER_ITEMS = [0, 1, 2];

@customElement('app-people')
export class PeoplePage extends SwapiListPage<Person> {
  sliceDetails: SliceDetails<Person> = people;
  sliceName: SliceName = 'people';
  header: string = 'People';

  renderPlaceholder() {
    return html`
      <app-grid>
        ${PLACEHOLDER_ITEMS.map(
          () => html`
            <app-column><app-person-card-placeholder></app-person-card-placeholder></app-column>
          `
        )}
      </app-grid>
    `;
  }

  renderList() {
    return html`
      <app-grid>
        ${this.pageResults.map(
          person => html`
            <app-column>
              <app-deferred-component ?disabled=${this.isPending}>
                <app-person-card-placeholder slot="placeholder"></app-person-card-placeholder>
                <app-person-card slot="component" .person=${person}></app-person-card>
              </app-deferred-component>
            </app-column>
          `
        )}
      </app-grid>
    `;
  }
}
