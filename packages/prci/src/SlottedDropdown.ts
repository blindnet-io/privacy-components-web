import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import {
  buttonStyles,
  containerStyles,
  imgStyles,
  textStyles,
} from './styles.js';
import { FormComponentState } from './utils/states.js';

/**
 * Collapsable element with slots for children
 */
@customElement('slotted-dropdown')
export class SlottedDropdown extends LitElement {
  @property({ type: String }) header = '';

  @property({ type: Boolean, attribute: 'include-buttons' })
  includeButtons: Boolean = false;

  // Boolean indicating if the choices should be displayed initially
  @property({ type: Number, reflect: true, attribute: 'dropdown-state' })
  dropdownState: FormComponentState = FormComponentState.CLOSED;

  static styles = [
    containerStyles,
    buttonStyles,
    textStyles,
    imgStyles,
    css`
      :host([dropdown-state='2']) .content-ctr {
        display: grid;
        /* row-gap: 40px; */
      }

      .content-ctr {
        display: none;
        padding: 40px;
      }

      :host([dropdown-state='2']) .header {
        margin: 0px 0px 20px 0px;
      }

      :host([dropdown-state='2']) .dropdown-btn-img {
        src: 'packages/prci/src/assets/icons/close_container_arrow.svg';
      }
    `,
  ];

  /**
   * Decide the next state when dropdown button is clicked
   */
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
      ${when(
        this.header,
        () => html`
        <button class="header link-btn" @click=${this.handleButtonClick}>
        <span class="medium-font underline">${this.header}</span>
        <img class="dropdown-btn-img medium-img" src='packages/prci/src/assets/icons/${
          this.dropdownState === FormComponentState.OPEN ? 'close' : 'open'
        }_container_arrow.svg' alt='open-arrow' width='24' height='24'></img>
        </button>
      `
      )}
      <div class="light-border content-ctr">
        <slot name="prompt"></slot>
        <slot></slot>
        <!-- Display button top open/close if in partial/open -->
        ${when(
          this.includeButtons,
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
