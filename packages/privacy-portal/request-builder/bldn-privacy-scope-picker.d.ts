import { LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { PrivacyScopeRestriction } from '@blindnet/core';
import '@blindnet/core-ui';
interface Choice<T> {
    value: T;
    display: TemplateResult<1 | 2>;
    allChoice?: boolean;
    checked?: boolean;
}
export declare class BldnPrivacyScopePicker extends LitElement {
    mode: 'select' | 'object' | 'restrict';
    privacyScope: PrivacyScopeRestriction[];
    dataCategories: Choice<string>[];
    processingCategories: Choice<PrivacyScopeRestriction.pc>[];
    purposes: Choice<PrivacyScopeRestriction.pp>[];
    _dataCategories: Set<string>;
    _processingCategories: Set<PrivacyScopeRestriction.pc>;
    _purposes: Set<PrivacyScopeRestriction.pp>;
    _showTooltip: boolean;
    getModeTemplate(): TemplateResult<1>;
    setPrivacyScope(): void;
    addDataCategory(e: Event): void;
    removeDataCategory(e: Event): void;
    addProcessingCategory(e: Event): void;
    removeProcessingCategory(e: Event): void;
    addPurpose(e: Event): void;
    removePurpose(e: Event): void;
    handlePrivacyScopeChange(): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};
