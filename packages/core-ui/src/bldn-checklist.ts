import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

interface Choice {
  value: string;
  display: string | TemplateResult<1 | 2>;
  checked?: boolean;
}

/**
 * Simple checklist component
 *
 * @event {CustomEvent} bldn-checklist:choice-select
 * @event {CustomEvent} bldn-checklist:choice-deselect
 */
@customElement('bldn-checklist')
export class BldnChecklist extends LitElement {
  @property({ type: Array }) choices: Choice[] = [];

  handleChoiceClick(e: Event) {
    const { id, checked } = e.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent(
        `bldn-checklist:choice-${checked ? 'select' : 'deselect'}`,
        {
          bubbles: true,
          composed: true,
          detail: {
            value: id,
          },
        }
      )
    );
  }

  render() {
    return html`
      ${map(
        this.choices,
        c => html`
          <input
            id=${c.value}
            type="checkbox"
            ?checked=${c.checked}
            @change=${this.handleChoiceClick}
          />
          <label>${c.display}</label>
        `
      )}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
