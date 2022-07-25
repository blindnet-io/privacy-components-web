import { LitElement, PropertyValueMap } from 'lit';
import { ACTION } from './models/priv-terms.js';
import { Demand } from './models/demand.js';
import { DemandState } from './utils/states.js';
import './DemandBuilderActionMenu.js';
import './DemandBuilderDropdownElement.js';
import './DemandBuilderTextElement.js';
import './demand-forms/TransparencyForm.js';
import './DemandBuilderSidebarItem.js';
/**
 * Handles creation and review of a single demand. Uses one of the ActionForm
 * components to display different options for each action type.
 */
export declare class DemandBuilder extends LitElement {
    includedActions: ACTION[];
    demandState: DemandState;
    demands: Map<string, Demand>;
    _selectedAction: ACTION;
    _sidebarSelectedIndex: number;
    constructor();
    static styles: import("lit").CSSResult;
    /**
     * Get a HTML template for the demand builder sidebar, with each PRIV action
     * included in this DemandBuilder as an option.
     * @returns HTML template for sidebar display
     */
    getSidebarTemplate(): import("lit-html").TemplateResult<1>;
    /**
     * Get an HTML template for the form corresponding to the selected action type.
     * @returns HTML template for action form
     */
    getSelectedFormTemplate(): import("lit-html").TemplateResult<1>;
    /**
     * Hook into update to fire an event letting the top level component know the user
     * has navigated past the action menu screen.
     * @param changedProperties Map of changed values to their previous value
     */
    update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    /**
     * Hook into firstUpdated to include an initial calculation of the sidebar index
     * @param _changedProperties
     */
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
