import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { PRCIStyles } from './styles.js';
import { STATUS_DESCRIPTIONS } from './utils/dictionary.js';
import { getRequestHistory } from './utils/privacy-request-api.js';
import { ComponentState } from './utils/states.js';

let RequestsView = class RequestsView extends LitElement {
    constructor() {
        super();
        this._requests = [];
        getRequestHistory().then(response => {
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
          <div class="list-header-ctr">
            <span class="list-header"><b>${msg('Created')}</b></span>
            <span class="list-header"><b>${msg('Status')}</b></span>
            <span class="list-header"><b>${msg('Demands')}</b></span>
            <span></span>
          </div>
          ${map(this._requests, r => html `
              <div class="list-item-ctr">
                <span class="list-item"
                  >${new Date(r.date).toLocaleDateString('en-gb')}</span
                >
                <span class="list-item"
                  >${STATUS_DESCRIPTIONS[r.status]()}</span
                >
                <span class="list-item">${r.demands}</span>
                <button
                  id=${r.id}
                  class="link-btn dark-font text --underline list-item"
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
          class="link-btn dark-font text --underline"
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
__decorate([
    state()
], RequestsView.prototype, "_requests", void 0);
RequestsView = __decorate([
    customElement('requests-view')
], RequestsView);

export { RequestsView };
//# sourceMappingURL=RequestsView.js.map
