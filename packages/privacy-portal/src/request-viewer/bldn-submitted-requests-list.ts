import { PrItem } from '@blindnet/core';
import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { STATUS_DESCRIPTIONS } from '../utils/dictionary.js';

@customElement('bldn-submitted-requests-list')
export class BldnSubmittedRequestsList extends LitElement {
  @property({ type: Array }) requests: PrItem[] | undefined;

  handleItemClick(id: string) {
    this.dispatchEvent(
      new CustomEvent('bldn-submitted-requests-list:request-click', {
        detail: {
          value: id,
        },
      })
    );
  }

  render() {
    return html`
      <div class="heading row">
        <span><b>${msg('Created')}</b></span>
        <span><b>${msg('Status')}</b></span>
        <span><b>${msg('Demands')}</b></span>
      </div>
      ${when(
        this.requests && this.requests.length > 0,
        () => html`
          <div id="items">
            ${map(
              this.requests,
              r => html`
                <button
                  id=${r.id}
                  class="item row"
                  @click=${() => this.handleItemClick(r.id)}
                >
                  <span>${new Date(r.date).toLocaleString()}</span>
                  <span>${STATUS_DESCRIPTIONS[r.status]()}</span>
                  <span>${r.demands}</span>
                </button>
              `
            )}
          </div>
        `,
        () => html`
          ${when(
            this.requests === undefined,
            () => html` <p>${msg('Loading your requests...')}</p> `,
            () => html` <p>${msg('No requests to display')}</p> `
          )}
        `
      )}
    `;
  }

  static styles = css`
    :host {
      display: block;
      color: var(--bldn-submitted-requests-list-font-color, var(--color-dark));
      font-size: var(
        --bldn-submitted-requests-font-size,
        var(--font-size-small)
      );
    }

    #items {
      display: grid;
      row-gap: 1.25em;
    }

    .heading {
      margin-bottom: 0.5em;
    }

    .row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .item {
      border: 2px solid var(--color-light);
      border-radius: 5px;
      padding: 1em 0;
      transition: 0.3s ease-out;
    }

    .item:hover {
      border-color: var(--color-dark);
      transition: 0.3s ease;
    }

    button {
      width: 100%;
      font-size: var(
        --bldn-submitted-requests-font-size,
        var(--font-size-small)
      );
      font-family: var(
        --bldn-submitted-requests-font-family,
        var(--font-family)
      );
      color: var(--bldn-submitted-requests-list-font-color, var(--color-dark));
      background: none;
      margin: none;
      padding: none;
    }
  `;
}
