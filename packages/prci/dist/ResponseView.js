import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { map } from 'lit/directives/map.js';
import { ACTION } from './models/priv-terms.js';
import { ACTION_DESCRIPTIONS } from './utils/dictionary.js';

/**
 * View the response to a privacy request.
 */
let ResponseView = class ResponseView extends LitElement {
    constructor() {
        super(...arguments);
        this.response = {
            response_id: '',
            request_id: '',
            date: '',
            demands: [
                {
                    demand_id: '',
                    date: '',
                    requested_action: ACTION.TRANSPARENCY,
                },
            ],
        };
    }
    accessTemplate(demand) {
        return html ``;
    }
    deleteTemplate(demand) {
        return html ``;
    }
    modifyTemplate(demand) {
        return html ``;
    }
    objectTemplate(demand) {
        return html ``;
    }
    revokeTemplate(demand) {
        return html ``;
    }
    restrictTemplate(demand) {
        return html ``;
    }
    portabilityTemplate(demand) {
        return html ``;
    }
    transparencyStandardTemplate(demand) {
        return html `
      <div class="transparency-rsp-ctr">
        <li>
          <b>${ACTION_DESCRIPTIONS[demand.requested_action]()}</b> -
          ${demand.status}
        </li>
        ${JSON.stringify(demand.answer)}
      </div>
    `;
    }
    transparencyAllTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyDataCatTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyDpoTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyKnownTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyLegalTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyOrgTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyPolicyTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyProcessTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyProvTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyPurposeTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyRetentionTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyWhoTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    transparencyWhereTemplate(demand) {
        return this.transparencyStandardTemplate(demand);
    }
    otherDemandTemplate(demand) {
        return html ``;
    }
    render() {
        return html `
      <h1>Requested Information</h1>
      <div id="responses-ctr">
        ${map(this.response.demands, d => choose(d.requested_action, [
            [ACTION.ACCESS, () => this.accessTemplate(d)],
            [ACTION.DELETE, () => this.deleteTemplate(d)],
            [ACTION.MODIFY, () => this.modifyTemplate(d)],
            [ACTION.OBJECT, () => this.objectTemplate(d)],
            [ACTION.REVOKE, () => this.revokeTemplate(d)],
            [ACTION.RESTRICT, () => this.restrictTemplate(d)],
            [ACTION.PORTABILITY, () => this.portabilityTemplate(d)],
            [ACTION.TRANSPARENCY, () => this.transparencyAllTemplate(d)],
            [
                ACTION['TRANSPARENCY.DATA.CATEGORIES'],
                () => this.transparencyDataCatTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.DPO'],
                () => this.transparencyDpoTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.KNOWN'],
                () => this.transparencyKnownTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.LEGAL.BASES'],
                () => this.transparencyLegalTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.ORGANIZATION'],
                () => this.transparencyOrgTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.POLICY'],
                () => this.transparencyPolicyTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.PROCESSING.CATEGORIES'],
                () => this.transparencyProcessTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.PROVENANCE'],
                () => this.transparencyProvTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.PURPOSE'],
                () => this.transparencyPurposeTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.RETENTION'],
                () => this.transparencyRetentionTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.WHERE'],
                () => this.transparencyWhereTemplate(d),
            ],
            [
                ACTION['TRANSPARENCY.WHO'],
                () => this.transparencyWhoTemplate(d),
            ],
            [ACTION['OTHER.DEMAND'], () => this.otherDemandTemplate(d)],
        ], () => html `${msg('ERROR: Invalid Action')}`))}
      </div>
    `;
    }
};
ResponseView.styles = css `
    :host {
      border: 2px solid #000;
      border-radius: 20px;
      padding: 35px 75px;
    }

    :host h1 {
      padding: 0px;
      margin: 0px;
      font-size: 24px;
      text-align: center;
    }

    #responses-ctr {
      display: grid;
      row-gap: 40px;
      padding: 50px 0px 0px 0px;
    }

    .transparency-rsp-ctr {
      display: grid;
      row-gap: 10px;
    }
  `;
__decorate([
    property({ attribute: false })
], ResponseView.prototype, "response", void 0);
ResponseView = __decorate([
    customElement('response-view')
], ResponseView);

export { ResponseView };
//# sourceMappingURL=ResponseView.js.map
