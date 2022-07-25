import { LitElement } from 'lit';
import { PrivacyResponse } from './models/privacy-response.js';
/**
 * View the response to a privacy request.
 */
export declare class ResponseView extends LitElement {
    response: PrivacyResponse;
    static styles: import("lit").CSSResult;
    transparencyTemplate(response: PrivacyResponse): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
