import { LitElement, PropertyValueMap } from 'lit';
import { Demand } from './models/demand.js';
import { ACTION } from './models/priv-terms.js';
export declare class ReviewView extends LitElement {
    demandGroupId: string;
    demands: Demand[];
    confirmDelete: boolean;
    _action: ACTION;
    static styles: import("lit").CSSResult[];
    getAccessReviewTemplate(): import("lit").TemplateResult<1>;
    getDeleteReviewTemplate(): import("lit").TemplateResult<1>;
    getModifyReviewTemplate(): import("lit").TemplateResult<1>;
    getObjectReviewTemplate(): import("lit").TemplateResult<1>;
    getPortabilityReviewTemplate(): import("lit").TemplateResult<1>;
    getRestrictReviewTemplate(): import("lit").TemplateResult<1>;
    getRevokeReviewTemplate(): import("lit").TemplateResult<1>;
    getTransparencyReviewTemplate(): import("lit").TemplateResult<1>;
    getOtherDemandReviewTemplate(): import("lit").TemplateResult<1>;
    handleEditClick(): void;
    handleDeleteClick(): void;
    handleConfirmDeleteClick(): void;
    handleCancelDeleteClick(): void;
    /**
     * Determine the action to use for this review container whenever demands changes
     * @param _changedProperties Properties that have changed in this update
     */
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit").TemplateResult<1>;
}
