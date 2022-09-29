import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { ComputationAPI } from '@blindnet/core';
import { PRCIStyles } from './styles.js';
import { STATUS_DESCRIPTIONS } from './utils/dictionary.js';
import { ComponentState } from './utils/states.js';

let RequestsView = class RequestsView extends LitElement {
    constructor() {
        super(...arguments);
        this._requests = [];
    }
    connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
        ComputationAPI.getInstance()
            .getRequestHistory()
            .then(response => {
            this._requests = response.history;
        });
    }
    handleRequestClick(e) {
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.STATUS,
                requestId: e.target.id,
            },
        }));
    }
    handleNewRequestClick() {
        this.dispatchEvent(new CustomEvent('component-state-change', {
            bubbles: true,
            composed: true,
            detail: {
                newState: ComponentState.MENU,
            },
        }));
    }
    render() {
        return html `
      <div id="table-ctr">
        <div id="requests-list">
          <div class="list__row--header">
            <span><b>${msg('Created')}</b></span>
            <span><b>${msg('Status')}</b></span>
            <span><b>${msg('Demands')}</b></span>
            <span></span>
          </div>
          ${map(this._requests, r => html `
              <div class="list__row">
                <span class="list__field"
                  >${new Date(r.date).toLocaleString()}</span
                >
                <span class="list__field"
                  >${STATUS_DESCRIPTIONS[r.status]()}</span
                >
                <span class="list__field">${r.demands}</span>
                <button
                  id=${r.id}
                  class="link-btn dark-font text--underline list__field"
                  @click=${this.handleRequestClick}
                >
                  ${msg('See Details')}
                </button>
              </div>
            `)}
        </div>
      </div>
      <div id="new-request-ctr">
        <button
          id="new-request-btn"
          class="link-btn dark-font text--underline"
          @click=${this.handleNewRequestClick}
        >
          ${msg('Submit a new Privacy Request')}
        </button>
      </div>
    `;
    }
};
RequestsView.styles = [
    PRCIStyles,
    css `
      :host {
        display: grid;
        max-width: 1000px;
        margin: auto;
        row-gap: 40px;
        justify-items: center;
      }

      #table-ctr {
        width: 100%;
      }

      #requests-list {
        display: grid;
        row-gap: 30px;
      }

      .list__row--header {
        display: grid;
        padding: 0px 10px;
        grid-column-gap: 5px;
        grid-template-columns: 3fr 2fr 1fr 2fr;
        text-align: center;
      }

      .list__row {
        display: grid;
        grid-template-columns: 3fr 2fr 1fr 2fr;
        grid-column-gap: 5px;
        padding: 20px 10px;
        border: 2px solid #5b5b5b;
        border-radius: 10px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      }

      .list__field {
        display: inline-flex;
        justify-items: center;
        text-align: center;
        justify-self: center;
        align-items: center;
      }

      .list__field:last-child {
        padding: 0px 20px 0px 0px;
      }

      #new-request-btn {
        font-size: 18px;
      }
    `,
];
__decorate([
    state()
], RequestsView.prototype, "_requests", void 0);
RequestsView = __decorate([
    customElement('requests-view')
], RequestsView);

export { RequestsView };
//# sourceMappingURL=RequestsView.js.map
