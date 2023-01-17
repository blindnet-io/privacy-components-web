import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Choice {
  display: string | TemplateResult<1 | 2>;
  value: string;
  checked?: boolean;
}

/**
 * Radio list with optional prompt.
 *
 * @element bldn-radio-list
 *
 * @fires bldn-radio-list:choice-change - Selected choice changes
 */
@customElement('bldn-radio-list')
export class BldnRadioList extends LitElement {
  /** @prop */
  @property({ type: Array }) choices: Choice[] = [];

  handleChoiceChange(e: Event) {
    const { id } = e.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent('bldn-radio-list:choice-change', {
        bubbles: true,
        composed: true,
        detail: {
          value: id,
        },
      })
    );
  }

  render() {
    return html`
      <slot name="prompt"></slot>
      <fieldset class="provenance-restriction">
        ${this.choices.map(
          choice => html`
            <input
              id=${choice.value}
              name='radio-list-choice'
              type='radio'
              ?checked=${choice.checked}
              @click=${this.handleChoiceChange}>
            </input>
            <label for=${choice.value}>${choice.display}</label><br/>
          `
        )}
      </fieldset>
    `;
  }

  static styles = css`
    :host {
      display: block;
      text-align: left;
      color: var(--bldn-radio-list-font-color, var(--color-dark));
    }

    fieldset {
      border: none;
      margin: 0;
      padding: 0em;
      text-align: left;
    }

    input {
      /* Ensures wrapped label text doesn't go under input */
      float: left;
      margin-top: 2px;
    }

    label {
      /* Ensures wrapped label text doesn't go under input */
      margin-left: 24px;
      display: block;
    }
  `;
}
