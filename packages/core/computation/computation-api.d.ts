import { DenyDemandPayload, PendingDemandDetailsPayload, PendingDemandPayload } from './generated-models/index.js';
import { HistoryResponse } from './models/history-response.js';
import { PrivacyRequest } from './models/privacy-request.js';
import { PrivacyResponse } from './models/privacy-response.js';
export declare class ComputationAPI {
    private static instance;
    static readonly MOCK_URL = "https://stoplight.io/mocks/blindnet/product-management:open-api/74767654";
    static readonly DEFAULT_URL = "https://devkit-pce-staging.azurewebsites.net/v0";
    /**
     * @param baseURL base URL (schema + host + port + base-path) to call
     */
    private constructor();
    get isMocked(): boolean;
    private fullURL;
    /**
     * base URL (schema + host + port + base-path) for all calls
     */
    private _baseURL;
    get baseURL(): string;
    private _apiToken;
    setToken(apiToken: string): void;
    hasApiToken(): boolean;
    private _adminToken;
    setAdminToken(adminToken: string): void;
    hasAdminToken(): boolean;
    /**
     *
     * @param baseURL base URL (schema + host + port + base-path) to call (for default behavior, see mock)
     * @param force override any preexisting configuration if it exists
     *
     */
    static configure(baseURL?: string, apiToken?: string, adminToken?: string, force?: boolean): boolean;
    static getInstance(): ComputationAPI;
    private headers;
    /**
     * Determine the correct mock header for a PrivacyRequest
     * @param request PrivacyRequest to get mock header for
     * @returns String to be used in the "prefer" header
     */
    private getMockHeader;
    private preProcessRequest;
    /**
     * Send a PrivacyRequest to the privacy-request API
     * @param {PrivacyRequest} request Request body to send
     * @returns
     */
    sendPrivacyRequest(request: PrivacyRequest): Promise<{
        request_id: string;
    }>;
    getRequestHistory(): Promise<HistoryResponse>;
    getRequest(requestId: string): Promise<PrivacyResponse>;
    cancelDemand(demand_id: string): Promise<void>;
    /**
     * Gets a list of all demands which are pending a response
     * @returns {PendingDemandPayload[]}
     */
    getPendingDemands(newAdminToken?: string): Promise<PendingDemandPayload[]>;
    /**
     * Get the info and recomendation for a specific demand
     * @param {string} id uuid of the demand
     * @returns {PendingDemandDetailsPayload}
     */
    getPendingDemandDetails(id: string, newAdminToken?: string): Promise<PendingDemandDetailsPayload>;
    /**
     * Approve a demand
     * @param id uuid of the demand to approve
     * @param msg optional message explaining the approval
     * @param lang language of the message
     * @returns
     */
    grantDemand(id: string, msg?: string, lang?: string, newAdminToken?: string): Promise<void>;
    /**
     * Deny a demand
     * @param id uuid of the demand to deny
     * @param msg optional message explaining the denial
     * @param motive motive for the denial. for the DCI, we are in the situation where demands
     * are being manually processed, so we assume the motive will be explained in msg and default to
     * 'OTHER-MOTIVE'.
     * @param lang language of the message
     * @returns
     */
    denyDemand(id: string, motive?: DenyDemandPayload.motive, msg?: string, lang?: string, newAdminToken?: string): Promise<void>;
    static clean(): void;
}
