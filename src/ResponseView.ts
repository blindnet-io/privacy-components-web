import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { PrivacyResponse } from './models/privacy-response.js';
import { descriptions } from './utils/dictionary.js';

// Question - are there types of responses other than transparency that give an immediate response?
// just wondering how generic this component needs to be.

/**
 * View the response to a privacy request.
 */
@customElement('response-view')
export class ResponseView extends LitElement {
  @property({ attribute: false }) response: PrivacyResponse = {
    responseId: '',
    inResponseTo: '',
    date: '',
    system: '',
    status: '',
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

  transparencyTemplate(response: PrivacyResponse) {
    // TODO: Change this to handle response.message or response.data
    if (response['requested-action']) {
      return html`
        <div class="transparency-rsp-ctr">
          <li><b>${descriptions[response['requested-action']]}</b></li>
          ${response.message}
        </div>
      `;
    }
    return html`Error: No requested-action in response`;
  }

  render() {
    // Extract array of one or more privacy responses
    const response: PrivacyResponse[] =
      this.response.includes && this.response.includes[0]
        ? this.response.includes
        : [this.response];

    return html`
      <h1>Requested Information</h1>
      <div id="responses-ctr">
        ${map(response, r => {
          if (r['requested-action']) {
            if (
              r['requested-action'].toLocaleLowerCase().includes('transparency')
            ) {
              return this.transparencyTemplate(r);
            }
            return html`Error: No HTML template defined for action type
            ${r['requested-action']}`;
          }
          return html`Error: No action in response`;
        })}
      </div>
    `;
  }
}
