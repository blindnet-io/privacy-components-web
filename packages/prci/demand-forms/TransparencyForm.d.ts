import { TemplateResult } from 'lit';
import { Demand } from '../models/demand.js';
import { ACTION } from '../models/priv-terms.js';
import { MultiDemandForm } from './MultiDemandForm.js';
import '../AllChecklist.js';
import { Restrictions } from '../models/restrictions.js';
/**
 * MultiDemandForm for the Transparency PRIV action. Includes a dropdown and text element.
 *
 * The transparency form follows a different pattern than the other actions, as each
 * TRANSPARENCY.* actually represents a completely separate demand, but we display them
 * all in one form.
 */
export declare class TransparencyForm extends MultiDemandForm {
    static styles: (import("lit").CSSResult | import("lit").CSSResultGroup[])[];
    transparencyActions: ACTION[];
    advancedSettings: never[];
    restrictions: Restrictions;
    _additionalMessage: string;
    constructor();
    handleProvenanceTermClick(e: Event): void;
    handleAdditionalMessageInput(e: Event): void;
    buildDemands(): Demand[];
    validate(): boolean;
    getFormTemplate(): TemplateResult<1 | 2>;
}
