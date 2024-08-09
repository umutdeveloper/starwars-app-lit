import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SliceDetails, SliceName, species } from '../features/swapi/swapiSlices';
import { Species } from '../features/swapi/models/species';
import { SwapiListPage } from '../hocs/SwapiListPage';

import '../hocs/DeferredComponent';
import '../components/SpeciesCard';
import '../components/SpeciesCard/SpeciesCardPlaceholder';
import '../components/Grid';
import '../components/Column';

const PLACEHOLDER_ITEMS = [0, 1, 2];

@customElement('app-species')
export class SpeciesPage extends SwapiListPage<Species> {
  sliceDetails: SliceDetails<Species> = species;
  sliceName: SliceName = 'species';
  header: string = 'Species';

  renderPlaceholder(): TemplateResult<1> {
    return html`
      <app-grid>
        ${PLACEHOLDER_ITEMS.map(
          () => html`
            <app-column><app-species-card-placeholder></app-species-card-placeholder></app-column>
          `
        )}
      </app-grid>
    `;
  }
  renderList(): TemplateResult<1> {
    return html`
      <app-grid>
        ${this.pageResults.map(
          species => html`
            <app-column>
              <app-deferred-component ?disabled=${this.isPending}>
                <app-species-card-placeholder slot="placeholder"></app-species-card-placeholder>
                <app-species-card slot="component" .species=${species}></app-species-card>
              </app-deferred-component>
            </app-column>
          `
        )}
      </app-grid>
    `;
  }
}
