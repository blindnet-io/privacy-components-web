import { PropertyValueMap, TemplateResult } from 'lit';
import { Demand } from '@blindnet/core';
import { MultiDemandForm } from './MultiDemandForm.js';
import '../AllChecklist.js';
/**
 * ActionForm for the REVOKE PRIV action.
 */
export declare class RevokeConsentForm extends MultiDemandForm {
    static styles: (import("lit").CSSResult | import("lit").CSSResultGroup[])[];
    _additionalMessage: string;
    _revokeAll: boolean;
    _allConsentIds: string[];
    _selectedConsentIds: Set<string>;
    constructor();
    handleAdditionalMessageInput(e: Event): void;
    handleRevokeAllClick(): void;
    handleRevokeSomeClick(): void;
    /**
     * Add or remove a consent restriction for the clicked consent
     * @param e Click event
     */
    handleConsentClick(e: Event): void;
    validate(): boolean;
    /**
     * Create a list of REVOKE demands, one per each consent restriction
     * @returns List of Demand objects
     */
    buildDemands(): Demand[];
    /**
     * FIXME: Once we fetch restrictions, only do this once they have loaded
     * @param _changedProperties
     */
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    getFormTemplate(): TemplateResult<1 | 2>;
}
