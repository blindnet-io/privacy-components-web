import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('demand-builder-text-element')
export class DemandBuilderTextElement extends LitElement {
  @property({ type: String }) prompt = 'Additional Message (optional)';

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 7fr 1fr;
      grid-template-rows: 75px;
      border: 2px solid #000;
      border-radius: 10px;
    }

    .element-prompt {
      display: flex;
      align-items: center;
      margin: 0px 20px;
    }

    .text-element-write-button {
      margin: 20px;
      height: 30px;
    }

    .content {
      display: none;
      overflow: hidden;
      grid-column: 1/3;
      grid-template-columns: 1fr;
      margin: 0px 20px;
    }

    .text-element-input-area {
      margin: 0px 0px 20px 0px;
    }
  `;

  handleTextButtonClick() {
    const textInputBox = this.shadowRoot?.getElementById('text-element-input');

    if (textInputBox) {
      if (textInputBox.style.display !== 'grid') {
        textInputBox.style.display = 'grid';
      } else {
        textInputBox.style.display = 'none';
        this.style.gridTemplateRows = '75px';
      }
    }
  }

  render() {
    return html`
      <div class="element-prompt">${this.prompt}</div>
      <button
        class="text-element-write-button"
        @click=${this.handleTextButtonClick}
      ></button>
      <div id="text-element-input" class="content">
        <textarea
          class="text-element-input-area"
          name="paragraph_text"
          cols="50"
          rows="5"
        ></textarea>
      </div>
    `;
  }
}
