/* eslint-disable @typescript-eslint/no-unused-vars */
import { msg, str } from '@lit/localize';
import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { map } from 'lit/directives/map.js';
import { ACTION } from './models/priv-terms.js';
import { DemandResponse, PrivacyResponse } from './models/privacy-response.js';
import { ACTION_DESCRIPTIONS } from './utils/dictionary.js';

/**
 * View the response to a privacy request.
 */
@customElement('response-view')
export class ResponseView extends LitElement {
  @property({ attribute: false }) response: PrivacyResponse = {
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

  static styles = css`
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

  accessTemplate(demand: DemandResponse): TemplateResult {
    return html``;
  }

  deleteTemplate(demand: DemandResponse): TemplateResult {
    return html``;
  }

  modifyTemplate(demand: DemandResponse): TemplateResult {
    return html``;
  }

  objectTemplate(demand: DemandResponse): TemplateResult {
    return html``;
  }

  revokeTemplate(demand: DemandResponse): TemplateResult {
    return html``;
  }

  restrictTemplate(demand: DemandResponse): TemplateResult {
    return html``;
  }

  portabilityTemplate(demand: DemandResponse): TemplateResult {
    return html``;
  }

  transparencyStandardTemplate(demand: DemandResponse) {
    return html`
      <div class="transparency-rsp-ctr">
        <li>
          <b>${ACTION_DESCRIPTIONS[demand.requested_action]()}</b> -
          ${demand.status}
        </li>
        ${JSON.stringify(demand.answer)}
      </div>
    `;
  }

  transparencyAllTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyDataCatTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyDpoTemplate(demand: DemandResponse) {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyKnownTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyLegalTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyOrgTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyPolicyTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyProcessTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyProvTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyPurposeTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyRetentionTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyWhoTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  transparencyWhereTemplate(demand: DemandResponse): TemplateResult {
    return this.transparencyStandardTemplate(demand);
  }

  otherDemandTemplate(demand: DemandResponse): TemplateResult {
    return html``;
  }

  render() {
    return html`
      <h1>Requested Information</h1>
      <div id="responses-ctr">
        ${map(this.response.demands, d =>
          choose(
            d.requested_action,
            [
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
            ],
            () => html`${msg('ERROR: Invalid Action')}`
          )
        )}
      </div>
    `;
  }
}
