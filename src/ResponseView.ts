import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

  static styles = css``;

  transparencyTemplate(response: PrivacyResponse) {
    // TODO: Change this to handle response.message or response.data
    if (response['requested-action']) {
      return html`
        <li>${descriptions[response['requested-action']]}</li>
        ${response.message}
      `;
    }
    return html`Error: No action in response`;
  }

  render() {
    // Extract array of one or more privacy responses
    const response: PrivacyResponse[] =
      this.response.includes && this.response.includes[0]
        ? this.response.includes
        : [this.response];

    return response.map(r => {
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
    });
  }
}
