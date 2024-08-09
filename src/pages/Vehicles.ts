import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SliceDetails, SliceName, vehicles } from '../features/swapi/swapiSlices';
import { Vehicle } from '../features/swapi/models/transport';
import { SwapiListPage } from '../hocs/SwapiListPage';

import '../hocs/DeferredComponent';
import '../components/VehicleCard';
import '../components/VehicleCard/VehicleCardPlaceholder';
import '../components/Grid';
import '../components/Column';

const PLACEHOLDER_ITEMS = [0, 1, 2];

@customElement('app-vehicles')
export class VehiclesPage extends SwapiListPage<Vehicle> {
  sliceDetails: SliceDetails<Vehicle> = vehicles;
  sliceName: SliceName = 'vehicles';
  header: string = 'Vehicles';

  renderPlaceholder(): TemplateResult<1> {
    return html`
      <app-grid>
        ${PLACEHOLDER_ITEMS.map(
          () => html`
            <app-column><app-vehicle-card-placeholder></app-vehicle-card-placeholder></app-column>
          `
        )}
      </app-grid>
    `;
  }
  renderList(): TemplateResult<1> {
    return html`
      <app-grid>
        ${this.pageResults.map(
          vehicle => html`
            <app-column>
              <app-deferred-component ?disabled=${this.isPending}>
                <app-vehicle-card-placeholder slot="placeholder"></app-vehicle-card-placeholder>
                <app-vehicle-card slot="component" .vehicle=${vehicle}></app-vehicle-card>
              </app-deferred-component>
            </app-column>
          `
        )}
      </app-grid>
    `;
  }
}
