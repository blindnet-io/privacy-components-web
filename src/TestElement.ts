import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { action } from './priv.js';

@customElement('test-element')
export class TestElement extends LitElement {
  @property({ type: String }) heading1 = 'My privacy request';

  @property({ type: String }) heading2 = 'Type of demand I want to submit';

  static styles = css`
    .actions-container {
      display: grid;
      gap: 10px;
    }
  `;

  actions = Object.values(action);

  render() {
    console.log('test element render');
    return html` <h1>Testelement</h1> `;
  }
}
