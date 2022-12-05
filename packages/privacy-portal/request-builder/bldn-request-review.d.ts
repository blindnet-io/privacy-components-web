import { CreatePrivacyRequestPayload, GivenConsentsPayload, PrivacyRequestDemand, PrivacyScopeRestriction } from '@blindnet/core';
import { LitElement, PropertyValueMap, TemplateResult } from 'lit';
import './bldn-nav-wrapper.js';
import '@blindnet/core-ui';
/**
 * @event {CustomEvent} bldn-request-review:edit-demands
 * @event {CustomEvent} bldn-request-review:delete-demands
 * @event {CustomEvent} bldn-request-review:back-click'
 * @event {Event} bldn-request-review:submit-request'
 */
export declare class BldnRequestReview extends LitElement {
    /** @prop */
    demandGroups: PrivacyRequestDemand[][];
    _consents: GivenConsentsPayload[];
    _target: undefined | CreatePrivacyRequestPayload.target;
    handleEditDemandGroupClick(demandGroupIndex: number): void;
    handleDeleteDemandGroupClick(demandGroupIndex: number): void;
    handleBackClick(): void;
    handleSubmitClick(): void;
    handleTargetChange(e: Event): void;
    getListTemplate(items: TemplateResult<1 | 2>[]): TemplateResult<1>;
    getPrivacyScopeListTemplate(privacyScopes: undefined | PrivacyScopeRestriction[]): TemplateResult<1>;
    getDateRestrictionTemplate(demandGroup: PrivacyRequestDemand[]): TemplateResult<1>;
    getReviewTemplate(demandGroup: PrivacyRequestDemand[]): TemplateResult<1>;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
