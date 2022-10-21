/* eslint-disable lit/no-value-attribute */
import { msg } from "@lit/localize"
import { css, html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @event {CustomEvent} bldn-date-restriction:start-date-change - Fires when the start date is changed
 * @event {CustomEvent} bldn-date-restriction:end-date-change - Fires when the end date is changed
 */
@customElement('bldn-date-restriction')
export class BldnDateRestriction extends LitElement {

  /** 
   * @prop Optional initial start date string
   *  
   * Expects a valid date string as described here:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings
   */
  @property({ type: String }) start: undefined | string;

  /** 
   * @prop Optional initial end date string
   *
   * Expects a valid date string as described here:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings 
   */
  @property({ type: String }) end: undefined | string;

  private handleDateChange(e: Event) {
    const { id, value } = e.target as HTMLInputElement;
    const date = new Date(value)

    // Emit change event if date and element id are valid
    if (date.toString() !== 'Invalid Date' && ['start-date', 'end-date'].includes(id)) {
      this.dispatchEvent(new CustomEvent(`bldn-date-restriction:${id === 'start-date' ? 'start' : 'end'}-date-change`))
    }
  }

  render() {

    return html`
      <p>
        ${msg('Specify a date range for the selected category(ies) of data:')}
      </p>
      <span>${msg('From')}</span>
      <input
        id="start-date"
        type="date"
        value=${ifDefined(this.start)}
        @input=${this.handleDateChange}
      />
      <span>${msg('to')}</span>
      <input
        id="end-date"
        type="date"
        value=${ifDefined(this.end)}
        @input=${this.handleDateChange}
      />
    `
  }

  static styles = css``

}