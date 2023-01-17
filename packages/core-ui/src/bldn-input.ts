import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { bldnStyles } from './bldn-styles.js';

/**
 * Custom input component
 *
 * @element bldn-input
 *
 * @fires bldn-input:input - Data entered/changed
 */
@customElement('bldn-input')
export class BldnInput extends LitElement {
  @property({ type: String, reflect: true }) mode:
    | 'default'
    | 'confirmed'
    | 'error' = 'default';

  @property({ type: String }) type:
    | 'hidden'
    | 'text'
    | 'search'
    | 'tel'
    | 'url'
    | 'email'
    | 'password'
    | 'datetime'
    | 'date'
    | 'month'
    | 'week'
    | 'time'
    | 'datetime-local'
    | 'number'
    | 'range'
    | 'color'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'submit'
    | 'image'
    | 'reset'
    | 'button' = 'text';

  @property({ type: String }) value: string = '';

  @property({ type: String }) placeholder: string = '';

  handleChange(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent<string>('bldn-input:input', { detail: value })
    );
  }

  render() {
    const inputClasses = {
      confirmed: this.mode === 'confirmed',
      error: this.mode === 'error',
    };
    return html`
      <input
        class=${classMap(inputClasses)}
        type=${this.type}
        .value=${this.value}
        placeholder=${this.placeholder}
        @change=${this.handleChange}
      />
    `;
  }

  static styles = [
    bldnStyles,
    css`
      input {
        padding: 10px 10px 10px 0px;
        text-indent: 10px;
        border-radius: 5px;
        border: 2px solid var(--color-light);
      }

      :host([mode='default']) input:focus,
      input:active {
        outline: none;
        border-color: var(--color-primary);
      }

      :host([mode='error']) input:focus,
      input:active {
        outline: none;
        border-color: var(--color-negative);
      }

      ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: var(--color-light);
        opacity: 1; /* Firefox */
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: var(--color-light);
      }

      ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: var(--color-light);
      }

      .confirmed {
        border-color: var(--color-positive);
      }

      .error {
        border-color: var(--color-negative);
      }
    `,
  ];
}
