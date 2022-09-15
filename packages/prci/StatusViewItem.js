import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { ACTION, DEMAND_STATUS, PROVENANCE, DATA_CATEGORY } from './models/priv-terms.js';
import { PRCIStyles } from './styles.js';
import { ACTION_DESCRIPTIONS, ACTION_TITLES, DEMAND_STATUS_DESCRIPTIONS } from './utils/dictionary.js';
import { getRetentionPolicyString } from './utils/utils.js';

/**
 * Status for a single demand in a Privacy Request
 */
let StatusViewItem = class StatusViewItem extends LitElement {
    constructor() {
        super(...arguments);
        this.demand = {
            demand_id: '',
            date: '',
            requested_action: ACTION.ACCESS,
            status: DEMAND_STATUS.GRANTED,
            includes: [],
            system: '',
        };
        this.demands = [];
        this.open = false;
    }
    accessResponseTemplate(demand) {
        return html `
      ${when([DEMAND_STATUS.GRANTED, DEMAND_STATUS['PARTIALLY-GRANTED']].includes(demand.status), () => {
            if (demand.data) {
                return html `
              <div>
                ${msg(
                // NOTE: For now, we assume demand.data is a JSON file
                html `Click <a href="${demand.data}.json">here</a> to download
                    your data.`)}
              </div>
            `;
            }
            return html `${msg('Obtaining data, please wait and refresh the page later.')}`;
        })}
    `;
    }
    deleteResponseTemplate() {
        return html ``;
    }
    transparencyResponseTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${demand.answer}
    `;
    }
    transparencyDcTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${map(demand.answer, dc => html ` ${dc}<br /> `)}
    `;
    }
    transparencyDpoTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${demand.answer}
    `;
    }
    transparencyKnownTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${demand.answer}
    `;
    }
    transparencyLbTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${map(demand.answer, lb => html `
          Type: ${lb.lb_type}<br />
          Name: ${lb.name}<br />
          Description: ${lb.description}<br /><br />
        `)}
    `;
    }
    transparencyOrgTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${demand.answer}
    `;
    }
    transparencyPolicyTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${demand.answer}
    `;
    }
    transparencyPcTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${map(demand.answer, pc => html ` ${pc}<br /> `)}
    `;
    }
    transparencyProvTemplate(demand) {
        const answer = demand.answer;
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${map(Object.entries(demand.answer), ([d, p]) => {
            const dc = d;
            const provenances = p;
            return html `
          ${map(provenances, prov => html `
              <p>
                <i>${dc}</i> data:
                ${choose(prov.provenance, [
                [PROVENANCE.ALL, () => msg(html ``)],
                [
                    PROVENANCE.USER,
                    () => msg(html `Provided by a user of the
                          <i>${prov.system}</i> system`),
                ],
                [
                    PROVENANCE['USER.DATA-SUBJECT'],
                    () => msg(html `Provided by you as a user of the
                          <i>${prov.system}</i> system`),
                ],
                [
                    PROVENANCE.TRANSFERRED,
                    () => msg(html `Derived by user actions, extracted from other data,
                          or inferred by the <i>${prov.system}</i> system`),
                ],
                [
                    PROVENANCE.DERIVED,
                    () => msg(html `Obtained by transfer from the
                          <i>${prov.system}</i> system`),
                ],
            ])}
              </p>
            `)}
        `;
        })}
      ${map(answer['AFFILIATION.selector_1'], prov => html `
          Provenance: ${prov.provenance}<br />
          System: ${prov.system}<br /><br />
        `)}
    `;
    }
    transparencyPurposeTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${map(demand.answer, purpose => html ` ${purpose}<br /> `)}
    `;
    }
    transparencyRetTemplate(demand) {
        const answer = demand.answer;
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${map(answer.NAME, rp => html `<p>
            ${getRetentionPolicyString(DATA_CATEGORY.NAME, rp.policy_type, rp.duration, rp.after)}
          </p>`)}
    `;
    }
    transparencyWhereTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${map(demand.answer, where => html ` ${where}<br /> `)}
    `;
    }
    transparencyWhoTemplate(demand) {
        return html `
      <p>
        <b>Requested info:</b> ${ACTION_DESCRIPTIONS[demand.requested_action]()}
      </p>
      ${map(demand.answer, who => html ` ${who}<br /> `)}
    `;
    }
    render() {
        return html `
      <div
        class="demand-status-ctr ${this.demand.status.toLowerCase()}-dmd border--medium border--rounded"
      >
        <span class="status-type-ctr"><b>${this.demand.status}</b></span>
        <div class="dmd-action-ctr ${this.open ? '' : 'round-bottom'}">
          <p class="action-title">
            <b
              >${ACTION_TITLES[this.demand.requested_action]()}
              ${msg('Demand')}</b
            >
          </p>
          ${when([
            DEMAND_STATUS.GRANTED,
            DEMAND_STATUS['PARTIALLY-GRANTED'],
            DEMAND_STATUS.DENIED,
        ].includes(this.demand.status), () => html `
              <button
                class="status-btn ${this.demand.status.toLowerCase()}-${this
            .open
            ? 'open'
            : 'closed'}-btn details-btn btn--curved btn--clickable"
                @click=${() => {
            this.open = !this.open;
        }}
              >
                ${msg('Details')}
              </button>
            `)}
          ${when(this.demand.status === DEMAND_STATUS['UNDER-REVIEW'], () => html `
              <button
                class="status-btn cancel-btn btn--curved btn--clickable"
                @click=${() => {
            this.open = !this.open;
        }}
              >
                ${msg('Cancel Demand')}
              </button>
            `)}
        </div>
        ${when(this.open, () => html `
            <div
              id="${this.demand.demand_id}-details-ctr"
              class="dmd-details-ctr round-bottom"
            >
              <b
                >Your demand has been
                ${DEMAND_STATUS_DESCRIPTIONS[this.demand.status]().toLocaleLowerCase()}.</b
              >
              ${choose(this.demand.requested_action, [
            [ACTION.ACCESS, () => this.accessResponseTemplate(this.demand)],
            [
                ACTION.TRANSPARENCY,
                () => this.transparencyResponseTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.DATA.CATEGORIES'],
                () => this.transparencyDcTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.DPO'],
                () => this.transparencyDpoTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.KNOWN'],
                () => this.transparencyKnownTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.LEGAL.BASES'],
                () => this.transparencyLbTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.ORGANIZATION'],
                () => this.transparencyOrgTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.POLICY'],
                () => this.transparencyPolicyTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.PROCESSING.CATEGORIES'],
                () => this.transparencyPcTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.PROVENANCE'],
                () => this.transparencyProvTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.PURPOSE'],
                () => this.transparencyPurposeTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.RETENTION'],
                () => this.transparencyRetTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.WHERE'],
                () => this.transparencyWhereTemplate(this.demand),
            ],
            [
                ACTION['TRANSPARENCY.WHO'],
                () => this.transparencyWhoTemplate(this.demand),
            ],
        ])}
              ${when(this.demand.message, () => html `
                  <p>Included message:</p>
                  <i>${this.demand.message}</i>
                `)}
            </div>
          `)}
      </div>
    `;
    }
};
StatusViewItem.styles = [
    PRCIStyles,
    css `
      .demand-status-ctr {
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        border: 2px solid #e6e6e6;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      }

      .status-type-ctr {
        font-size: 16px;
      }

      .demand-status-ctr span {
        padding: 10px 0px;
      }

      .dmd-action-ctr {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-items: center;
        column-gap: 20px;
        padding: 20px 20px;
        background: white;
      }

      .granted-dmd {
        background-color: #51d214;
        border-color: #51d214;
      }

      .granted-dmd button {
        border: 2px solid #51d214;
      }

      :host([open]) .granted-dmd button {
        background-color: #51d214;
      }

      .denied-dmd {
        background-color: #f90707;
        border-color: #f90707;
      }

      .denied-dmd button {
        border: 2px solid #f90707;
      }

      :host([open]) .denied-dmd button {
        background-color: #f90707;
      }

      .partially-granted-dmd {
        background-color: #ff7a00;
        border-color: #ff7a00;
      }

      .partially-granted-dmd button {
        border: 2px solid #ff7a00;
      }

      :host([open]) .partially-granted-dmd button {
        background-color: #ff7a00;
      }

      :host([open]) .details-btn {
        color: white;
      }

      .status-btn {
        background: none;
        padding: 10px 40px;
        justify-self: center;
        align-self: flex-end;
        float: right;
        font-size: 16px;
        font-weight: bold;
      }

      .details-btn {
        background-color: white;
        color: black;
      }

      .cancel-btn {
        border: 2px solid #f90707;
      }

      .round-bottom {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }

      .granted-dmd span {
        color: white;
      }

      .denied-dmd span {
        color: white;
      }

      .partially-granted-dmd span {
        color: white;
      }

      .under-review-dmd {
        background-color: #e6e6e6;
        border-color: #e6e6e6;
      }

      .cancelled-dmd {
        background-color: #ffc1bd;
        border-color: #ffc1bd;
      }

      .action-title {
        justify-self: center;
      }

      .dmd-details-ctr {
        display: grid;
        background-color: white;
        row-gap: 20px;
        /* height: 100px; */
        padding: 10px 20px 30px 20px;
      }

      p {
        margin: 0;
        padding: 0;
      }
    `,
];
__decorate([
    property({ attribute: false })
], StatusViewItem.prototype, "demand", void 0);
__decorate([
    property({ attribute: false })
], StatusViewItem.prototype, "demands", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], StatusViewItem.prototype, "open", void 0);
StatusViewItem = __decorate([
    customElement('status-view-item')
], StatusViewItem);

export { StatusViewItem };
//# sourceMappingURL=StatusViewItem.js.map
