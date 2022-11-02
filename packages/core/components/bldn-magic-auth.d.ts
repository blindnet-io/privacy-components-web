import { LitElement, PropertyValueMap } from 'lit';
export declare class BldnMagicAuth extends LitElement {
    /**
     * @prop {string} magicPubKey Publishable api key for a magic auth application
     * See https://magic.link/auth for details
     * @example pk_live_2BDA1CB7D23A6XF9
     */
    magicPubKey: undefined | string;
    /**
     * @prop {string} prompt Text to display above the email input
     * @example Welcome to MyApplication!
     */
    prompt: string;
    /**
     * @prop {undefined | string} redirectURI URI to redirect to after a successful auth flow
     * @example http://localhost:8000/myAppPage
     */
    redirectUri: undefined | string;
    private _magic;
    private _isLoggedIn;
    private _loggedInUser;
    private _email;
    private _requireEmail;
    handleSubmit(): void;
    handleLogout(): void;
    handleMagicPubKeyChange(): void;
    handleLoggedInChange(): void;
    handleEmailChange(e: CustomEvent<string>): void;
    protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
