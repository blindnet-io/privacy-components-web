import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { bldnStyles } from './blindnet-wc-styles.js';

import './bldn-data-consum-demand-list-item.js';
import { PendingDemandPayload } from '../computation/models/PendingDemandPayload.js';

@customElement('bldn-data-consum-demand-list')
export class DataConsumerDemandList extends LitElement {
  @property({ type: Array }) demands: PendingDemandPayload[] = [];

  render() {
    return html`
      <div class="list__row--heading">
        <span class="list__date-col"><b>${msg('Created')}</b></span>
        <span><b>${msg('Data Subject')}</b></span>
        <span><b>${msg('Action')}</b></span>
      </div>
      ${map(
        this.demands,
        d => html`
          <bldn-data-consum-demand-list-item
            demand=${JSON.stringify(d)}
          ></bldn-data-consum-demand-list-item>
        `
      )}
    `;
  }

  static styles = [
    bldnStyles,
    css`
      :host {
        display: grid;
        color: var(--color-dark);
      }

      .list__row--heading {
        display: grid;
        grid-template-columns: repeat(3, 2fr) 1fr;
        padding: 10px 0px;
        font-size: 14px;
      }
    `,
  ];
}
