import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Collapsable element displaying a prompt and text input field.
 */
@customElement('demand-builder-text-element')
export class DemandBuilderTextElement extends LitElement {
  @property({ type: String }) prompt = 'Additional Message (optional)';

  @property({ type: Boolean, reflect: true }) open = false;

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 7fr 1fr;
      border: 2px solid #000;
      border-radius: 10px;
      padding: 20px 40px 20px 40px;
    }

    :host([open]) #text-input {
      display: grid;
    }

    #element-prompt {
      display: flex;
      align-items: center;
    }

    #text-element-write-button {
      height: 30px;
      background: url('/src/assets/icons/edit_fill.svg');
      height: 24px;
      width: 24px;
      border: none;
      justify-self: right;
    }

    #text-input {
      display: none;
      overflow: hidden;
      grid-column: 1/3;
      margin: 25px 0px 0px 0px;
    }

    p {
      margin: 0px;
    }
  `;

  handleInput(e: Event) {
    const event = new CustomEvent('text-element-change', {
      bubbles: true,
      composed: true,
      detail: {
        text: (e.target as HTMLTextAreaElement).value,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <p id="element-prompt">${this.prompt}</p>
      <button
        id="text-element-write-button"
        @click=${() => {
          this.open = !this.open;
        }}
      ></button>
      <textarea
        id="text-input"
        name="paragraph_text"
        cols="50"
        rows="5"
        @input=${this.handleInput}
      ></textarea>
    `;
  }
}
