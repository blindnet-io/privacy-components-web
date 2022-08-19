import { TemplateResult } from 'lit';
import { Demand } from '../models/demand.js';
import { ACTION } from '../models/priv-terms.js';
import { ActionForm } from './ActionForm.js';
import '../SlottedDropdown.js';
import '../AllChecklist.js';
import { Restriction } from '../models/restriction.js';
/**
 * ActionForm for the Transparency PRIV action. Includes a dropdown and text element.
 *
 * The transparency form follows a different pattern than the other actions, as each
 * TRANSPARENCY.* actually represents a completely separate demand, but we display them
 * all in one DemandBuilder element.
 */
export declare class TransparencyForm extends ActionForm {
    transparencyActions: ACTION[];
    advancedSettings: never[];
    _additionalMessage: string;
    _provenances: Set<Restriction>;
    static styles: (import("lit").CSSResult | import("lit").CSSResultGroup[])[];
    constructor();
    handleAdditionalMessageInput(e: Event): void;
    validate(): boolean;
    /**
     * The defualt transparency demand contains all transparency actions
     * @returns List of demands with each TRANSPARENCY.* action
     */
    getDefaultDemands(): Demand[];
    getEditTemplate(demands: Demand[]): TemplateResult<1 | 2>;
    getReviewTemplate(): TemplateResult<1 | 2>;
}
