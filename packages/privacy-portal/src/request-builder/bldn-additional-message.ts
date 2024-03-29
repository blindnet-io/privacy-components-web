import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bldn-additional-message')
export class BldnAdditionalMessage extends LitElement {
  /** @prop Optional initial value of the additional message textarea */
  @property({ type: String }) message: undefined | string;

  private handleMessageChange(e: Event) {
    const { value } = e.target as HTMLTextAreaElement;
    this.dispatchEvent(
      new CustomEvent('bldn-additional-message:message-change', {
        bubbles: true,
        composed: true,
        detail: { message: value },
      })
    );
  }

  render() {
    return html`
      <p class="">${msg('My additional message:')}</p>
      <p>
        <i>
          ${msg(
            'Please note that adding a personalized message might lead to the demand taking longer to be processed'
          )}
        </i>
      </p>
      <textarea
        id="additional-msg"
        class="std-txt-area"
        name="paragraph_text"
        cols="50"
        rows="10"
        @input=${this.handleMessageChange}
      >
${this.message}</textarea
      >
    `;
  }

  static styles = css`
    :host {
      display: block;
      text-align: left;
    }

    textarea {
      /* Change to border-box so text area doesn't overflow the component */
      box-sizing: border-box;
      width: 100%;
      border: 1px solid
        var(--bldn-additional-message-textarea-border-color, var(--color-light));
      background: rgba(var(--color-light-rgb), 0.2);
      border-radius: 10px;
    }
  `;
}
