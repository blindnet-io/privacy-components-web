import { css, html, LitElement} from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface Option {
  label: string,
  value: string
}

@customElement('bldn-nav-toggle')
export class BldnNavToggle extends LitElement {

  @property({ type: Array }) left: Option = {
    label: 'Option 1',
    value: 'option_1'
  }

  @property({ type: Object }) right: Option = {
    label: 'Option 2',
    value: 'option_2'
  }

  @state() _selected: 'left' | 'right' = 'left'

  handleClick(side: 'left' | 'right') {
    const clickedOption = side === 'left' ? this.left : this.right
    this._selected = side
    this.dispatchEvent(new CustomEvent('bldn-nav-toggle:click', {detail: {value: clickedOption.value}}))
  }

  render() {
    
    return html`
      <div>
        <button class=${this._selected === 'left' ? 'selected' : ''} @click=${() => this.handleClick('left')}><strong>${this.left.label}</strong></button>
        <button class=${this._selected === 'right' ? 'selected' : ''} @click=${() => this.handleClick('right')}><strong>${this.right.label}</strong></button>
      </div>
    `
  }

  static styles = css`

    :host {
      display: block;
      text-align: center;
    }

    div {
      /* Remove space between buttons */
      font-size: 0px;
    }

    button {
      border: none;
      font-size: var(--bldn-nav-toggle-font-size, var(--font-size-large));
      color: var(--bldn-nav-toggle-color-deselected, var(--color-medium));
    }

    button:first-child {
      border-right: 1px solid var(--bldn-nav-toggle-color-selected, var(--color-darkest));
      padding-right: 0.75em;
    }

    button:last-child {
      border-left: 1px solid var(--bldn-nav-toggle-color-selected, var(--color-darkest));
      padding-left: 0.75em;
    }

    .selected {
      color: var(--bldn-nav-toggle-color-selected, var(--color-darkest));
    }

  `
}