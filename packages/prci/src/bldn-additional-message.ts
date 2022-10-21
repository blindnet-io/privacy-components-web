import { msg } from "@lit/localize"
import { css, html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js";

@customElement('bldn-additional-message')
export class BldnAdditionalMessage extends LitElement {

  /** @prop Optional initial value of the additional message textarea */
  @property({ type: String }) message: undefined | string;

  private handleMessageChange(e: Event) {
    const { value } = e.target as HTMLTextAreaElement
    this.dispatchEvent(new CustomEvent('bldn-additional-message:message-change', {
      detail: { message: value }
    }))
  }

  render() {
    return html`
      <p class="">${msg('My additional message:')}</p>
      <p><i>
        ${msg('Please note that adding a personalized message might lead to the demand taking longer to be processed')}
      </i></p>
      <textarea
        id="additional-msg"
        class="std-txt-area"
        name="paragraph_text"
        cols="50"
        rows="10"
        @input=${this.handleMessageChange}
        value=${ifDefined(this.message)}
      ></textarea>
    `
  }

  static styles = css``

}