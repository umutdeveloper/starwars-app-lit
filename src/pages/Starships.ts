import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SliceDetails, SliceName, starships } from '../features/swapi/swapiSlices';
import { StarShip } from '../features/swapi/models/transport';
import { SwapiListPage } from '../hocs/SwapiListPage';

import '../hocs/DeferredComponent';
import '../components/StarshipCard';
import '../components/StarshipCard/StarshipCardPlaceholder';
import '../components/Grid';
import '../components/Column';

const PLACEHOLDER_ITEMS = [0, 1, 2];

@customElement('app-starships')
export class StarshipsPage extends SwapiListPage<StarShip> {
  sliceDetails: SliceDetails<StarShip> = starships;
  sliceName: SliceName = 'starships';
  header: string = 'StarShips';

  renderPlaceholder(): TemplateResult<1> {
    return html`
      <app-grid>
        ${PLACEHOLDER_ITEMS.map(
          () => html`
            <app-column><app-starship-card-placeholder></app-starship-card-placeholder></app-column>
          `
        )}
      </app-grid>
    `;
  }
  renderList(): TemplateResult<1> {
    return html`
      <app-grid>
        ${this.pageResults.map(
          starship => html`
            <app-column>
              <app-deferred-component ?disabled=${this.isPending}>
                <app-starship-card-placeholder slot="placeholder"></app-starship-card-placeholder>
                <app-starship-card slot="component" .starship=${starship}></app-starship-card>
              </app-deferred-component>
            </app-column>
          `
        )}
      </app-grid>
    `;
  }
}
