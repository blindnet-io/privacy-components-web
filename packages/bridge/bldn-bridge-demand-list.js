import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { bldnStyles } from '@blindnet/core-ui';
import './bldn-bridge-demand-list-item.js';

let BldnBridgeDemandList = class BldnBridgeDemandList extends LitElement {
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
                <bldn-bridge-demand-list-item
                  demand=${JSON.stringify(d)}
                ></bldn-bridge-demand-list-item>
              `)}
          </div>
        `, () => html `${msg('No requests to display.')}`)}
    `;
    }
};
BldnBridgeDemandList.styles = [
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
], BldnBridgeDemandList.prototype, "demands", void 0);
BldnBridgeDemandList = __decorate([
    customElement('bldn-bridge-demand-list')
], BldnBridgeDemandList);

export { BldnBridgeDemandList };
//# sourceMappingURL=bldn-bridge-demand-list.js.map
