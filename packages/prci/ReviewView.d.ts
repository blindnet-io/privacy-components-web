import { LitElement, PropertyValueMap } from 'lit';
import { Demand } from './models/demand.js';
import { ACTION, TARGET } from './models/priv-terms.js';
export declare class ReviewView extends LitElement {
    static styles: import("lit").CSSResult[];
    demandGroupId: string;
    demands: Demand[];
    demand: Demand;
    confirmDelete: boolean;
    target: TARGET;
    _action: ACTION;
    getAccessReviewTemplate(): import("lit-html").TemplateResult<1>;
    getDeleteReviewTemplate(): import("lit-html").TemplateResult<1>;
    getModifyReviewTemplate(): import("lit-html").TemplateResult<1>;
    getObjectReviewTemplate(): import("lit-html").TemplateResult<1>;
    getPortabilityReviewTemplate(): import("lit-html").TemplateResult<1>;
    getRestrictReviewTemplate(): import("lit-html").TemplateResult<1>;
    /**
     * FIXME: Use actual revoke texts once the endpoint provides them
     * @returns
     */
    getRevokeReviewTemplate(): import("lit-html").TemplateResult<1>;
    getTransparencyReviewTemplate(): import("lit-html").TemplateResult<1>;
    getOtherDemandReviewTemplate(): import("lit-html").TemplateResult<1>;
    getDateRangeReviewTemplate(from: Date | undefined, to: Date | undefined): import("lit-html").TemplateResult<1>;
    handleEditClick(): void;
    handleDeleteClick(): void;
    handleConfirmDeleteClick(): void;
    handleCancelDeleteClick(): void;
    handleTargetClick(e: Event): void;
    handleSubmitClick(): void;
    /**
     * Determine the action to use for this review container whenever demands changes
     * @param _changedProperties Properties that have changed in this update
     */
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
