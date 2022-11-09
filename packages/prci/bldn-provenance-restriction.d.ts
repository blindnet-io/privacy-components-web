import { LitElement } from 'lit';
/**
 * @event {CustomEvent} bldn-provenance-restriction:term-change - Fired when term selection changes
 * @event {CustomEvent} bldn-provenance-restriction:target-change - Fired when target selection changes
 */
export declare class BldnProvenanceRestriction extends LitElement {
    /** @prop Optional initial provenance category */
    term: undefined | string;
    /** @prop Optional initial provenance target */
    target: undefined | string;
    private handleTermChange;
    private handleTargetChange;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
