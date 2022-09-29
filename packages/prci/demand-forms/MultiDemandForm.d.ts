import { CSSResultGroup, LitElement, TemplateResult } from 'lit';
import { Demand, ACTION } from '@blindnet/core';
import { DemandState } from '../utils/states.js';
/**
 * Abstract class for a form that allows the user to create or edit multiple demands.
 */
export declare abstract class MultiDemandForm extends LitElement {
    static styles: CSSResultGroup[];
    demandState: DemandState;
    demandGroupId: string;
    demands: Demand[];
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
     * Create a list of demands from the data entered in the form
     */
    abstract buildDemands(): Demand[];
    /**
     * Get the edit template for this action
     * @param useDefault Indicates if form should be populated with default values or from input demands
     * @returns HTML template
     */
    abstract getFormTemplate(): TemplateResult;
    render(): TemplateResult<1 | 2>;
}
