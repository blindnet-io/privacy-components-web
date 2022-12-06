/* eslint-disable camelcase */
import { localized, msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  CompletedDemandPayload,
  DataSubjectPayload,
  PendingDemandPayload,
} from '@blindnet/core';
import { setLocale } from './localization.js';

import '@blindnet/core-ui';
import './bldn-bridge-demand-list.js';

interface DisplayedDemand {
  id: string;
  date: string;
  action: PendingDemandPayload.action | CompletedDemandPayload.action;
  data_subject?: DataSubjectPayload;
}

type DemandsFilter = 'all' | 'pending' | 'answered' | 'canceled';

@localized()
@customElement('bldn-bridge-requests')
export class BldnBridgeRequests extends LitElement {
  @property({ type: Array }) pendingDemands: PendingDemandPayload[] = [];

  @property({ type: Array }) completedDemands: CompletedDemandPayload[] = [];

  @state() _allDemands: DisplayedDemand[] = [];

  @state() _pendingDemands: DisplayedDemand[] = [];

  @state() _answeredDemands: DisplayedDemand[] = [];

  @state() _canceledDemands: DisplayedDemand[] = [];

  @state() _displayedDemands: DisplayedDemand[] = [];

  @state() _demandFilter: DemandsFilter = 'pending';

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

  /**
   * Decide which demands to display
   * @param e Event with selected demand filter
   */
  handleDemandFilterClick(e: Event) {
    e.stopPropagation();
    const { value } = (e as CustomEvent).detail;
    this._demandFilter = value;
  }

  updateDisplayedDemands() {
    switch (this._demandFilter) {
      case 'all':
        this._displayedDemands = this._allDemands;
        break;
      case 'pending':
        this._displayedDemands = this._pendingDemands;
        break;
      case 'answered':
        this._displayedDemands = this._answeredDemands;
        break;
      case 'canceled':
        this._displayedDemands = this._canceledDemands;
        break;
      default:
        break;
    }
  }

  handleDemandsChange() {
    // All demands includes pending and completed
    this._allDemands = this.pendingDemands
      .map(({ id, date, action, data_subject }) => ({
        id,
        date,
        action,
        data_subject,
      }))
      .concat(
        this.completedDemands.map(
          ({ id, request_date, action, data_subject }) => ({
            id,
            date: request_date,
            action,
            data_subject,
          })
        )
      );

    this._pendingDemands = this.pendingDemands.map(
      ({ id, date, action, data_subject }) => ({
        id,
        date,
        action,
        data_subject,
      })
    );

    this._answeredDemands = this.completedDemands.map(
      ({ id, request_date, action, data_subject }) => ({
        id,
        date: request_date,
        action,
        data_subject,
      })
    );

    this._canceledDemands = this.completedDemands
      .filter(d => d.status === CompletedDemandPayload.status.CANCELED)
      .map(({ id, request_date, action, data_subject }) => ({
        id,
        date: request_date,
        action,
        data_subject,
      }));

    this.updateDisplayedDemands();
  }

  /**
   * Pre-filter each demand list so we don't do it on every switch
   */
  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (
      (_changedProperties.has('pendingDemands') && this.pendingDemands) ||
      (_changedProperties.has('completedDemands') && this.completedDemands)
    )
      this.handleDemandsChange();
    if (_changedProperties.has('_demandFilter') && this._demandFilter)
      this.updateDisplayedDemands();
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
        @bldn-horizontal-list:choice-change=${this.handleDemandFilterClick}
      ></bldn-horizontal-list>
      <bldn-bridge-demand-list
        .demands=${this._displayedDemands}
      ></bldn-bridge-demand-list>
    `;
  }

  static styles = css`
    bldn-horizontal-list {
      padding-bottom: 4vh;
    }
  `;
}
