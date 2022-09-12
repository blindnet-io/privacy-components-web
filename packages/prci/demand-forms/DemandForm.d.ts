import { CSSResultGroup, LitElement, TemplateResult } from 'lit';
import { Demand } from '../models/demand.js';
import { DemandState } from '../utils/states.js';
/**
 * Abstract class for a form that allows the user to create or edit a demand.
 */
export declare abstract class DemandForm extends LitElement {
    static styles: CSSResultGroup[];
    demandState: DemandState;
    demand: Demand;
    demandGroupId: string;
    /**
     * Send this demand up to the top level component to add to the Privacy Request
     * @param demandGroupId uuid of this demand group
     * @param demand demand to add
     */
    addToPrivacyRequest(demandGroupId: string, demand: Demand): void;
    /**
     * Go back to the action menu
     */
    handleBackClick(): void;
    /**
     * Validate and add demand to request when add clicked
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
    abstract getFormTemplate(demand: Demand): TemplateResult;
    render(): TemplateResult<1 | 2>;
}
