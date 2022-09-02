import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { DCIStyles } from './styles.js';
import { getPendingDemands } from './utils/data-consumer-api.js';
import './RequestsListItem.js';

let ProcessRequestsView = class ProcessRequestsView extends LitElement {
    constructor() {
        super();
        this._demands = [];
        this._intervalId = undefined;
        this.reloadRequests();
    }
    reloadRequests() {
        getPendingDemands().then(response => {
            this._demands = response;
        });
    }
    render() {
        return html `
      <div id="process-req-ctr">
        <span class="title"><b>${msg('PRIVACY REQUESTS TO PROCESS')}</b></span>
        <div id="requests-list">
          <div class="list-header-ctr">
            <span class="list-header"><b>${msg('Submitted')}</b></span>
            <span class="list-header"><b>${msg('Data Subject')}</b></span>
            <span class="list-header"><b>${msg('Action(s)')}</b></span>
          </div>
          ${map(this._demands, d => html `<requests-list-item .demand=${d}></requests-list-item>`)}
        </div>
      </div>
    `;
    }
};
ProcessRequestsView.styles = [
    DCIStyles,
    css `
      #process-req-ctr {
        display: grid;
        row-gap: 40px;
        text-align: center;
      }

      #requests-list {
        display: grid;
        row-gap: 10px;
      }

      .list-header-ctr {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        text-align: center;
      }

      .title {
        font-size: 22px;
      }
    `,
];
__decorate([
    state()
], ProcessRequestsView.prototype, "_demands", void 0);
__decorate([
    state()
], ProcessRequestsView.prototype, "_intervalId", void 0);
ProcessRequestsView = __decorate([
    customElement('process-requests-view')
], ProcessRequestsView);

export { ProcessRequestsView };
//# sourceMappingURL=ProcessRequestsView.js.map
