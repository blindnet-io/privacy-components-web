import { LitElement, html, css } from 'lit';
import '@blindnet/dci';

export class AppDCI extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html` <bldn-data-consum></bldn-data-consum> `;
  }
}

customElements.define('app-dci', AppDCI);
