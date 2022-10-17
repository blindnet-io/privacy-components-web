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
      <button class=${this._selected === 'left' ? 'selected' : ''} @click=${() => this.handleClick('left')}>${this.left.label}</button>
      <button class=${this._selected === 'right' ? 'selected' : ''} @click=${() => this.handleClick('right')}>${this.right.label}</button>
    `
  }

  static styles = css`

    :host {
      font-size: 0px; /* Remove gap between buttons */
    }

    button {
      border: none;
      font-size: 24px;
      color: lightgray;
    }

    button:first-child {
      border-right: 1px solid black;
    }

    button:last-child {
      border-left: 1px solid black;
    }

    .selected {
      color: darkgray
    }

  `
}