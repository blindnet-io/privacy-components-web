import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

@customElement('bldn-demand-builder')
export class BldnDemandBuilder extends LitElement {

  @property({ type: String }) mode: 'build' | 'review' = 'build'

  render() {
    return html`
      ${when(this.mode === 'build', () => html`
        <bldn-nav-wrapper mode='double'></bldn-nav-wrapper>
      `, () => html`
        <bldn-nav-wrapper mode='single'>
          <bldn-request-review></bldn-request-review>
        </bldn-nav-wrapper>
      `)}
    `
  }

  static styles = css``

}