import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { bldnStyles } from './bldn-styles.js';

interface Choice {
  value: string;
  display: string;
  selected?: boolean;
}

/**
 * Horizontal menu list that highlists the selected choice.
 *
 * @element bldn-horizontal-list
 *
 * @fires bldn-horizontal-list:choice-change - A new choice is selected
 */
@customElement('bldn-horizontal-list')
export class HorizontalList extends LitElement {
  @property({ type: Array }) choices: Choice[] = [];

  @state() _selected: number = 0;

  handleChoiceClick(e: Event) {
    const { id } = e.target as HTMLButtonElement;
    this._selected = this.choices.findIndex(c => c.value === id);
    this.dispatchEvent(
      new CustomEvent('bldn-horizontal-list:choice-change', {
        detail: {
          value: id,
        },
      })
    );
  }

  render() {
    return html`
      <div>
        ${map(
          this.choices,
          (choice, i) => html`
            <button
              id=${choice.value}
              class="choice ${i === this._selected ? 'choice--selected' : ''}"
              @click=${this.handleChoiceClick}
            >
              ${choice.display}
            </button>
          `
        )}
      </div>
    `;
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (
      _changedProperties.has('choices') &&
      _changedProperties.get('choices') === undefined
    ) {
      this._selected = this.choices.findIndex(c => c.selected);
      if (this._selected < 0) {
        this._selected = 0;
      }
    }
  }

  static styles = [
    bldnStyles,
    css`
      :host {
        display: block;
      }

      div {
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
        font-size: var(
          --bldn-horizontal-list-font-size,
          var(--font-size-medium)
        );
        background: var(
          --bldn-horizontal-list-background-color,
          var(--background)
        );
      }
    `,
  ];
}
