import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { bldnStyles } from './bldn-styles.js';

import './bldn-data-consum-demand-list-item.js';
import { PendingDemandPayload } from '../models/generated-models/index.js';

@customElement('bldn-data-consum-demand-list')
export class DataConsumerDemandList extends LitElement {
  @property({ type: Array }) demands: PendingDemandPayload[] = [];

  render() {
    return html`
      ${when(
        this.demands.length > 0,
        () => html`
          <div id="list__row--heading">
            <span class="list__date-col"><b>${msg('Created')}</b></span>
            <span><b>${msg('Data Subject')}</b></span>
            <span><b>${msg('Action')}</b></span>
          </div>
          <div id="list__items">
            ${map(
              this.demands,
              d => html`
                <bldn-data-consum-demand-list-item
                  demand=${JSON.stringify(d)}
                ></bldn-data-consum-demand-list-item>
              `
            )}
          </div>
        `,
        () => html`${msg('No requests to display.')}`
      )}
    `;
  }

  static styles = [
    bldnStyles,
    css`
      :host {
        color: var(--color-dark);
      }

      #list__row--heading {
        display: grid;
        grid-template-columns: repeat(3, 2fr) 1fr;
        padding: 0px 0px 5px 0px;
        font-size: 14px;
      }

      #list__items {
        display: grid;
        row-gap: 10px;
      }
    `,
  ];
}
