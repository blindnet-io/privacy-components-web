/* eslint-disable camelcase */
import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import {
  CompletedDemandPayload,
  PendingDemandPayload,
  DataSubjectPayload,
} from '@blindnet/core';
import { bldnStyles } from '@blindnet/core-ui';
import './bldn-bridge-demand-list-item.js';

interface DisplayedDemand {
  id: string;
  date: string;
  action: PendingDemandPayload.action | CompletedDemandPayload.action;
  data_subject?: DataSubjectPayload;
}

@customElement('bldn-bridge-demand-list')
export class BldnBridgeDemandList extends LitElement {
  @property({ type: Array }) demands: DisplayedDemand[] = [];

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
                <bldn-bridge-demand-list-item
                  .demand=${d}
                ></bldn-bridge-demand-list-item>
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
