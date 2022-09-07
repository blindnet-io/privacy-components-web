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
  static styles = [
    containerStyles,
    buttonStyles,
    textStyles,
    imgStyles,
    css`
      .content-ctr {
        display: none;
      }

      :host([dropdown-state='2']) .content-ctr {
        display: grid;
        row-gap: 50px;
      }

      .dropdown {
        padding: 40px 40px 20px 40px;
      }

      :host([dropdown-state='0']) .dropdown {
        display: none;
      }

      :host([dropdown-state='2']) .header {
        margin: 0px 0px 20px 0px;
      }

      :host([dropdown-state='2']) .dropdown-btn-img {
        src: 'packages/prci/src/assets/icons/close_container_arrow.svg';
      }

      .close-btn-ctr {
        margin: 20px 0px 0px 0px;
        text-align: center;
      }
    `,
  ];

  @property({ type: String }) header = '';

  @property({ type: Boolean, attribute: 'include-buttons' })
  includeButtons: Boolean = false;

  // Boolean indicating if the choices should be displayed initially
  @property({ type: Number, reflect: true, attribute: 'dropdown-state' })
  dropdownState: FormComponentState = FormComponentState.CLOSED;

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
            ${when(
              this.dropdownState === FormComponentState.OPEN,
              () => html`
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path d="m7.4 15.375-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6Z" />
                </svg>
              `,
              () => html`
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" />
                </svg>
              `
            )}
            <simple-icon
              icon="expand-${this.dropdownState === FormComponentState.OPEN
                ? 'less'
                : 'more'}"
            >
            </simple-icon>
          </button>
        `
      )}
      <div class="light-border dropdown">
        <div class="content-ctr">
          <slot name="prompt"></slot>
          <slot></slot>
        </div>
        <!-- Display button top open/close if in partial/open -->
        ${when(
          this.includeButtons,
          () => html`
            <div class="close-btn-ctr">
              <button class="svg-btn" @click=${this.handleButtonClick}>
                ${when(
                  this.dropdownState === FormComponentState.PARTIAL,
                  () => html`
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                    >
                      <path
                        d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z"
                      />
                    </svg>
                  `,
                  () => html`
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                    >
                      <path d="m7.4 15.375-1.4-1.4 6-6 6 6-1.4 1.4-4.6-4.6Z" />
                    </svg>
                  `
                )}
              </button>
            </div>
          `
        )}
      </div>
    `;
  }
}
