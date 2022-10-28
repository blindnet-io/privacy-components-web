import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Choice {
  display: string | TemplateResult<1 | 2>;
  value: string;
  selected?: boolean;
}

/**
 * Radio list with optional prompt.
 *
 * @event {CustomEvent} bldn-radio-list:choice-change - Fired when the list choice changess
 */
@customElement('bldn-radio-list')
export class BldnRadioList extends LitElement {
  /** @prop */
  @property({ type: Array }) choices: Choice[] = [];

  handleChoiceChange(e: Event) {
    const { id } = (e as CustomEvent).detail;
    this.dispatchEvent(
      new CustomEvent('bldn-radio-list:choice-change', {
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
              ?checked=${choice.selected}
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
