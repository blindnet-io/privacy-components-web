import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { bldnStyles } from './bldn-styles.js';
import './bldn-data-consum-demand-list-item.js';

let DataConsumerDemandList = class DataConsumerDemandList extends LitElement {
    constructor() {
        super(...arguments);
        this.demands = [];
    }
    render() {
        return html `
      ${when(this.demands.length > 0, () => html `
          <div id="list__row--heading">
            <span class="list__date-col"><b>${msg('Created')}</b></span>
            <span><b>${msg('Data Subject')}</b></span>
            <span><b>${msg('Action')}</b></span>
          </div>
          <div id="list__items">
            ${map(this.demands, d => html `
                <bldn-data-consum-demand-list-item
                  demand=${JSON.stringify(d)}
                ></bldn-data-consum-demand-list-item>
              `)}
          </div>
        `, () => html `${msg('No requests to display.')}`)}
    `;
    }
};
DataConsumerDemandList.styles = [
    bldnStyles,
    css `
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
__decorate([
    property({ type: Array })
], DataConsumerDemandList.prototype, "demands", void 0);
DataConsumerDemandList = __decorate([
    customElement('bldn-data-consum-demand-list')
], DataConsumerDemandList);

export { DataConsumerDemandList };
//# sourceMappingURL=bldn-data-consum-demand-list.js.map
