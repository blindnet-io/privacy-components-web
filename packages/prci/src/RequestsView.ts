import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { RequestHistoryItem } from './models/history-response.js';
import { REQUEST_STATUS } from './models/priv-terms.js';
import { buttonStyles, containerStyles, textStyles } from './styles.js';
import { STATUS_DESCRIPTIONS } from './utils/dictionary.js';
import { getRequestHistory } from './utils/privacy-request-api.js';
import { ComponentState } from './utils/states.js';

@customElement('requests-view')
export class RequestsView extends LitElement {
  @state() _requests: RequestHistoryItem[] = [];

  constructor() {
    super();
    getRequestHistory().then(response => {
      this._requests = response.history;
    });
  }

  static styles = [
    containerStyles,
    buttonStyles,
    textStyles,
    css`
      :host {
        display: grid;
        max-width: 600px;
        margin: auto;
        row-gap: 40px;
        justify-items: center;
      }

      #table-ctr {
        width: 100%;
        /* overflow-y: auto;
        max-height: 500px; */
      }

      #requests-list {
        display: grid;
        row-gap: 30px;
      }

      .list-header-ctr {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        text-align: center;
      }

      .list-item-ctr {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 20px 0px;
        border: 2px solid #5b5b5b;
        border-radius: 10px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      }

      .list-item {
        display: inline-flex;
        justify-items: center;
        text-align: center;
        justify-self: center;
        align-items: center;
      }

      .list-item:last-child {
        padding: 0px 20px 0px 0px;
      }

      #new-request-btn {
        font-size: 18px;
      }
    `,
  ];

  handleRequestClick(e: Event) {
    this.dispatchEvent(
      new CustomEvent('component-state-change', {
        bubbles: true,
        composed: true,
        detail: {
          newState: ComponentState.STATUS,
          requestId: (e.target as HTMLInputElement).id,
        },
      })
    );
  }

  handleNewRequestClick() {
    this.dispatchEvent(
      new CustomEvent('component-state-change', {
        bubbles: true,
        composed: true,
        detail: {
          newState: ComponentState.MENU,
        },
      })
    );
  }

  render() {
    return html`
      <div id="table-ctr">
        <div id="requests-list">
          <div class="list-header-ctr">
            <span class="list-header"><b>${msg('Created')}</b></span>
            <span class="list-header"><b>${msg('Status')}</b></span>
            <span class="list-header"><b>${msg('Demands')}</b></span>
            <span></span>
          </div>
          ${map(
            this._requests,
            r => html`
              <div class="list-item-ctr">
                <span class="list-item"
                  >${new Date(r.date).toLocaleDateString('en-gb')}</span
                >
                <span class="list-item"
                  >${STATUS_DESCRIPTIONS[r.status as REQUEST_STATUS]()}</span
                >
                <span class="list-item">${r.demands}</span>
                <button
                  id=${r.id}
                  class="link-btn dark-font underline list-item"
                  @click=${this.handleRequestClick}
                >
                  ${msg('See Details')}
                </button>
              </div>
            `
          )}
        </div>
      </div>
      <div id="new-request-ctr">
        <button
          id="new-request-btn"
          class="link-btn dark-font underline"
          @click=${this.handleNewRequestClick}
        >
          ${msg('Submit a new Privacy Request')}
        </button>
      </div>
    `;
  }
}
