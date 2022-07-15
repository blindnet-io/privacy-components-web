import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('request-review')
export class RequestReview extends LitElement {
  static styles = css`
    :host {
      display: grid;
    }

    .demands-summary-container {
      display: grid;
    }
  `;

  render() {
    return html` <div class="demands-summary-container"></div> `;
  }
}
