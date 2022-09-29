import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

let DataConsumerRequests = class DataConsumerRequests extends LitElement {
    constructor() {
        super(...arguments);
        this.demands = [];
    }
    render() {
        return html `
      <bldn-horizontal-list
        choices=${JSON.stringify([
            { id: 'all', display: 'All' },
            { id: 'pending', display: 'Pending', selected: true },
            { id: 'answered', display: 'Answered' },
            { id: 'canceled', display: 'Canceled' },
        ])}
      ></bldn-horizontal-list>
      <bldn-data-consum-demand-list
        demands=${JSON.stringify(this.demands)}
      ></bldn-data-consum-demand-list>
    `;
    }
};
DataConsumerRequests.styles = css `
    bldn-horizontal-list {
      padding-bottom: 4vh;
    }
  `;
__decorate([
    property({ type: Array })
], DataConsumerRequests.prototype, "demands", void 0);
DataConsumerRequests = __decorate([
    customElement('bldn-data-consum-requests')
], DataConsumerRequests);

export { DataConsumerRequests };
//# sourceMappingURL=bldn-data-consum-requests.js.map
