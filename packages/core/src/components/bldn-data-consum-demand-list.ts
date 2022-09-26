import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators';
import { map } from 'lit/directives/map.js';
import { components } from '../models/schema.js';

type PendingDemandPayload = components['schemas']['PendingDemandPayload'];
@customElement('bldn-data-consum-demand-list')
export class DataConsumerDemandList extends LitElement {
  @property({ type: Array }) demands: PendingDemandPayload[] = [];

  render() {
    return html`
      <div id="list__heading">
        <span><b>${msg('Created')}</b></span>
        <span><b>${msg('Data Subject')}</b></span>
        <span><b>${msg('Action')}</b></span>
      </div>
      ${map(
        this.demands,
        d => html`
          <div class="list__row">
            <span>${new Date(d.date).toLocaleDateString('en-gb')}</span>
            <span>${d.data_subject?.id}</span>
            <span>${d.action}</span>
            <button></button>
          </div>
        `
      )}
    `;
  }

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(3, 2fr) 1fr;
    }

    #list__heading {
    }

    .list__row {
      border: 1px solid var(--color-light);
      border-radius: 5px;
    }
  `;
}
