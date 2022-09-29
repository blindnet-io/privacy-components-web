import { TemplateResult } from 'lit';
import { DATA_CATEGORY, Demand } from '@blindnet/core';
import { DemandForm } from './DemandForm.js';
import '../AllChecklist.js';
/**
 * ActionForm for the Access PRIV action. Includes a dropdown and text element.
 */
export declare class AccessForm extends DemandForm {
    static styles: (import("lit").CSSResult | import("lit").CSSResultGroup[])[];
    allowedDataCategories: DATA_CATEGORY[];
    constructor();
    handleAdditionalMessageInput(e: Event): void;
    handleProvenanceTermClick(e: Event): void;
    handleProvenanceTargetClick(e: Event): void;
    handleDateRestrictionInput(e: Event): void;
    validate(): boolean;
    getDefaultDemand(): Demand;
    getFormTemplate(demand: Demand): TemplateResult<1 | 2>;
}
