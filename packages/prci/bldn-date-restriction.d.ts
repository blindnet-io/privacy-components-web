import { LitElement } from 'lit';
/**
 * @event {CustomEvent} bldn-date-restriction:start-date-change - Fires when the start date is changed.
 * Contains a date string in the form yyyy-mm-dd in event.details.date field.
 *
 * @event {CustomEvent} bldn-date-restriction:end-date-change - Fires when the end date is changed
 * Contains a date string in the form yyyy-mm-dd in event.details.date field.
 */
export declare class BldnDateRestriction extends LitElement {
    /**
     * @prop Optional initial start date string
     *
     * Expects a valid date string as described here:
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings
     */
    start: undefined | string;
    /**
     * @prop Optional initial end date string
     *
     * Expects a valid date string as described here:
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings
     */
    end: undefined | string;
    private handleDateChange;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
