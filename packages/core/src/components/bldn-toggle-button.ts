import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { bldnStyles } from './blindnet-wc-styles.js';

@customElement('bldn-toggle-button')
export class ToggleButton extends LitElement {
  @property({ type: String, attribute: 'left' }) left: string = '';

  @property({ type: String, attribute: 'right' }) right: string = '';

  @property({ type: String, attribute: 'selected' }) selected:
    | 'left'
    | 'right' = 'left';

  handleClick(side: 'left' | 'right') {
    this.dispatchEvent(
      new CustomEvent(`bldn-toggle-button-change`, {
        detail: { newValue: side === 'left' ? this.left : this.right },
      })
    );
    this.selected = side;
  }

  render() {
    return html`
      <button
        id="toggle-button-half__left"
        class="${this.selected === 'left'
          ? 'toggle-button-half__selected'
          : ''}"
        @click=${() => this.handleClick('left')}
      >
        ${this.left}
      </button>
      <button
        id="toggle-button-half__right"
        class="${this.selected === 'right'
          ? 'toggle-button-half__selected'
          : ''}"
        @click=${() => this.handleClick('right')}
      >
        ${this.right}
      </button>
    `;
  }

  static styles = [
    bldnStyles,
    css`
      :host {
        /* Grid ensures both buttons have same width, dictated by whichever has larger text */
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      button {
        color: var(--color-dark);
        border: 1px solid var(--color-light);
        padding: 10px 20px;
        /* font-size: 0.6vw; */
        font-size: 16px;
      }

      #toggle-button-half__left {
        border-radius: 7.5px 0px 0px 7.5px;
        border-right-width: 1px;
        border-right-color: var(--color-primary);
      }

      #toggle-button-half__right {
        border-radius: 0px 7.5px 7.5px 0px;
        border-left-width: 0px;
        border-left-color: var(--color-primary);
      }

      .toggle-button-half__selected {
        border-color: var(--color-primary);
        background: linear-gradient(
            0deg,
            rgba(var(--color-primary-rgb), 0.1),
            rgba(var(--color-primary-rgb), 0.1)
          ),
          #ffffff;
      }
    `,
  ];
}
