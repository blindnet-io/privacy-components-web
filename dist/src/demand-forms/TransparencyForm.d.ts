import { LitElement } from 'lit';
import '../DemandBuilderDropdownElement.js';
import '../DemandBuilderTextElement.js';
import { ACTION } from '../models/priv-terms.js';
import { Demand } from '../models/demand.js';
import { DemandState } from '../utils/states.js';
/**
 * ActionForm for the Transparency PRIV action. Includes a dropdown and text element.
 *
 * The transparency form follows a different pattern than the other actions, as each
 * TRANSPARENCY.* actually represents a completely separate demand, but we display them
 * all in one DemandBuilder element.
 */
export declare class TransparencyForm extends LitElement {
    demandState: DemandState;
    transparencyActions: ACTION[];
    demands: Map<string, Demand>;
    demandBuilderId: string;
    private _extraMessage;
    constructor();
    static styles: import("lit").CSSResult;
    /**
     * Get the edit display for a transparency demand
     * @returns HTML template for edit display
     */
    getEditTemplate(): import("lit-html").TemplateResult<1>;
    /**
     * Get the review display for a transparency demand
     * @returns HTML template for review display
     */
    getReviewTemplate(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
