import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('bldn-button')
export class BldnButton extends LitElement {
  static styles = css``;

  render() {
    return html` <button></button> `;
  }
}
