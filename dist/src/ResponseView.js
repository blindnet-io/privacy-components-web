import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { descriptions } from './utils/dictionary.js';
// Question - are there types of responses other than transparency that give an immediate response?
// just wondering how generic this component needs to be.
/**
 * View the response to a privacy request.
 */
let ResponseView = class ResponseView extends LitElement {
    constructor() {
        super(...arguments);
        this.response = {
            responseId: '',
            inResponseTo: '',
            date: '',
            system: '',
            status: '',
        };
    }
    transparencyTemplate(response) {
        // TODO: Change this to handle response.message or response.data
        if (response['requested-action']) {
            return html `
        <div class="transparency-rsp-ctr">
          <li><b>${descriptions[response['requested-action']]}</b></li>
          ${response.message}
        </div>
      `;
        }
        return html `Error: No requested-action in response`;
    }
    render() {
        // Extract array of one or more privacy responses
        const response = this.response.includes && this.response.includes[0]
            ? this.response.includes
            : [this.response];
        return html `
      <h1>Requested Information</h1>
      <div id="responses-ctr">
        ${map(response, r => {
            if (r['requested-action']) {
                if (r['requested-action'].toLocaleLowerCase().includes('transparency')) {
                    return this.transparencyTemplate(r);
                }
                return html `Error: No HTML template defined for action type
            ${r['requested-action']}`;
            }
            return html `Error: No action in response`;
        })}
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