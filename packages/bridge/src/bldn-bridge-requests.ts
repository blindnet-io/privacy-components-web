import { localized, msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PendingDemandPayload } from '@blindnet/core';
import { setLocale } from './localization.js';

import '@blindnet/core-ui';
import './bldn-bridge-demand-list.js';

@localized()
@customElement('bldn-bridge-requests')
export class BldnBridgeRequests extends LitElement {
  @property({ type: Array }) demands: PendingDemandPayload[] = [];

  constructor() {
    super();

    // Set locale if current one is supported
    try {
      setLocale(navigator.language);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Could not set locale to ${navigator.language}.`);
    }
  }

  render() {
    return html`
      <bldn-horizontal-list
        choices=${JSON.stringify([
          { value: 'all', display: msg('All') },
          { value: 'pending', display: msg('Pending'), selected: true },
          { value: 'answered', display: msg('Answered') },
          { value: 'canceled', display: msg('Canceled') },
        ])}
      ></bldn-horizontal-list>
      <bldn-bridge-demand-list
        demands=${JSON.stringify(this.demands)}
      ></bldn-bridge-demand-list>
    `;
  }

  static styles = css`
    bldn-horizontal-list {
      padding-bottom: 4vh;
    }
  `;
}
