import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PrivacyResponse } from './models/privacy-response.js';

// Question - are there types of responses other than transparency that give an immediate response?
// just wondering how generic this component needs to be.
@customElement('response-view')
export class ResponseView extends LitElement {
  @property({ attribute: false }) response: PrivacyResponse = {
    responseId: '',
    inResponseTo: '',
    date: '',
    system: '',
  };

  static styles = css``;

  render() {
    return html``;
  }
}
