import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { planets, SliceDetails, SliceName } from '../features/swapi/swapiSlices';
import { Planet } from '../features/swapi/models/planet';
import { SwapiListPage } from '../hocs/SwapiListPage';

import '../hocs/DeferredComponent';
import '../components/PlanetCard';
import '../components/PlanetCard/PlanetCardPlaceholder';
import '../components/Grid';
import '../components/Column';

const PLACEHOLDER_ITEMS = [0, 1, 2];

@customElement('app-planets')
export class PlanetsPage extends SwapiListPage<Planet> {
  sliceDetails: SliceDetails<Planet> = planets;
  sliceName: SliceName = 'planets';
  header: string = 'Planets';

  renderPlaceholder(): TemplateResult<1> {
    return html`
      <app-grid>
        ${PLACEHOLDER_ITEMS.map(
          () => html`
            <app-column><app-planet-card-placeholder></app-planet-card-placeholder></app-column>
          `
        )}
      </app-grid>
    `;
  }
  renderList(): TemplateResult<1> {
    return html`
      <app-grid>
        ${this.pageResults.map(
          planet => html`
            <app-column>
              <app-deferred-component ?disabled=${this.isPending}>
                <app-planet-card-placeholder slot="placeholder"></app-planet-card-placeholder>
                <app-planet-card slot="component" .planet=${planet}></app-planet-card>
              </app-deferred-component>
            </app-column>
          `
        )}
      </app-grid>
    `;
  }
}
