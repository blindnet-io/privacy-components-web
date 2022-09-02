import { CSSResultGroup, LitElement, TemplateResult } from 'lit';
import { Demand } from '../models/demand.js';
import { ACTION } from '../models/priv-terms.js';
import { DemandState } from '../utils/states.js';
/**
 * Abstract class for a form that allows the user to create or edit multiple demands.
 */
export declare abstract class MultiDemandForm extends LitElement {
    demandState: DemandState;
    demandGroupId: string;
    demands: Demand[];
    static styles: CSSResultGroup[];
    setDemand(demand: Demand): void;
    deleteDemand(action: ACTION): void;
    addToPrivacyRequest(demandGroupId: string, demands: Demand[]): void;
    /**
     * Go back to the action menu
     */
    handleBackClick(): void;
    /**
     * On add click validate and add data then move to review
     */
    handleAddClick(): void;
    /**
     * Validate data entered before adding to Privacy Request
     */
    abstract validate(): boolean;
    /**
     * Get the edit template for this action
     * @param useDefault Indicates if form should be populated with default values or from input demands
     * @returns HTML template
     */
    abstract getEditTemplate(demands: Demand[]): TemplateResult;
    render(): TemplateResult<1 | 2>;
}
