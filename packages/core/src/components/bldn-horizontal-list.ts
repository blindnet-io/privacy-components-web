import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { bldnStyles } from './blindnet-wc-styles.js';

interface ListChoice {
  id: string;
  display: string;
  selected?: boolean;
}

@customElement('bldn-horizontal-list')
export class HorizontalList extends LitElement {
  @property({ type: Array }) choices: ListChoice[] = [];

  @state() _selected: number = 0;

  render() {
    return html`
      ${map(
        this.choices,
        (choice, i) => html`
          <button
            id=${choice.id}
            class="choice ${i === this._selected ? 'choice--selected' : ''}"
            @click=${() => {
              this._selected = i;
            }}
          >
            ${choice.display}
          </button>
        `
      )}
    `;
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('choices')) {
      this._selected = this.choices.findIndex(c => c.selected);
      if (this._selected < 0) {
        this._selected = 0;
      }
    }
    if (_changedProperties.has('_selected')) {
      this.dispatchEvent(
        new CustomEvent('horizontal-list-choice-change', {
          detail: {
            selected: this.choices[this._selected],
          },
        })
      );
    }
  }

  static styles = [
    bldnStyles,
    css`
      :host {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
      }

      .choice {
        padding: 5px 20px;
        border: none;
        border-bottom: 1px solid var(--color-medium);
      }

      .choice--selected {
        color: var(--color-primary);
        border-bottom: 2px solid var(--color-primary);
      }

      button {
        color: var(--color-dark);
        font-size: 16px;
      }
    `,
  ];
}
