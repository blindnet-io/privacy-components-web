import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

interface ListChoice {
  id: string;
  display: string;
}

@customElement('bldn-horizontal-list')
export class HorizontalList extends LitElement {
  @property({ type: Array }) choices: ListChoice[] = [];

  render() {
    return html`
      ${map(this.choices, choice => html` <button>${choice.display}</button> `)}
    `;
  }

  static style = css`
    :host {
      display: grid;
      /* grid-template-rows: 1fr; */
      /* grid-auto-flow: column; */
      /* grid-auto-columns: 1fr; */
      grid-template-columns: repeat(4, 1fr);
    }
  `;
}
