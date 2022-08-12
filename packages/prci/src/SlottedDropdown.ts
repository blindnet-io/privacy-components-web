import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { buttonStyles, imgStyles, textStyles } from './styles.js';
import { FormComponentState } from './utils/states.js';

/**
 * Collapsable element displaying a prompt and list of choices, each with a checkbox.
 */
@customElement('slotted-dropdown')
export class SlottedDropdown extends LitElement {
  @property({ type: String }) header = '';

  // Boolean indicating if the choices should be displayed initially
  @property({ type: Number, reflect: true, attribute: 'dropdown-state' })
  dropdownState: FormComponentState = FormComponentState.CLOSED;

  static styles = [
    buttonStyles,
    textStyles,
    imgStyles,
    css`
      :host([dropdown-state='2']) .content-ctr {
        display: grid;
      }

      .content-ctr {
        display: none;
        border: 2px solid #000;
        border-radius: 10px;
      }
    `,
  ];

  handleButtonClick() {
    if (
      this.dropdownState === FormComponentState.CLOSED ||
      this.dropdownState === FormComponentState.PARTIAL
    ) {
      this.dropdownState = FormComponentState.OPEN;
    } else {
      this.dropdownState = FormComponentState.CLOSED;
    }
  }

  render() {
    return html`
      <button class="link-btn" @click=${this.handleButtonClick}>
      <span class="underline">${this.header}</span>
      <img src='/src/assets/icons/open_container_arrow.svg' alt='open-arrow' width='24' height='24'></img>
      </button>
      <div class="content-ctr">
        <slot></slot>
        <!-- Display button top open/close if in partial/open -->
        ${when(
          this.dropdownState !== FormComponentState.CLOSED,
          () => html`
            <button
              @click=${this.handleButtonClick}
              class="ctr-btn ${this.dropdownState === FormComponentState.PARTIAL
                ? 'open-btn'
                : 'close-btn'}"
            ></button>
          `
        )}
      </div>


    `;
  }
}
