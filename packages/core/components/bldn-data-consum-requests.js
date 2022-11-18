import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { localized, msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { setLocale } from './localization.js';

let DataConsumerRequests = class DataConsumerRequests extends LitElement {
    constructor() {
        super();
        this.demands = [];
        // Set locale if current one is supported
        try {
            setLocale(navigator.language);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Could not set locale to ${navigator.language}.`);
        }
    }
    render() {
        return html `
      <bldn-horizontal-list
        choices=${JSON.stringify([
            { value: 'all', display: msg('All') },
            { value: 'pending', display: msg('Pending'), selected: true },
            { value: 'answered', display: msg('Answered') },
            { value: 'canceled', display: msg('Canceled') },
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
    localized(),
    customElement('bldn-data-consum-requests')
], DataConsumerRequests);

export { DataConsumerRequests };
//# sourceMappingURL=bldn-data-consum-requests.js.map
