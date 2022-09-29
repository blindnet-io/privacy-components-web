import './generated-models/models/CreateLegalBasePayload.js';
import './generated-models/models/CreateProvenancePayload.js';
import './generated-models/models/CreateRetentionPolicyPayload.js';
import './generated-models/models/DemandResolution.js';
import { DenyDemandPayload } from './generated-models/models/DenyDemandPayload.js';
import './generated-models/models/LegalBase.js';
import './generated-models/models/PendingDemandDetailsPayload.js';
import './generated-models/models/PendingDemandPayload.js';
import './generated-models/models/PrItem.js';
import './generated-models/models/PrivacyResponsePayload.js';
import './generated-models/models/PrivacyScopeRestriction.js';
import './generated-models/models/PrivacyScopeTriple.js';
import './generated-models/models/Provenance.js';
import './generated-models/models/ProvenanceRestriction.js';
import './generated-models/models/Recommendation.js';
import './generated-models/models/RetentionPolicy.js';
import './generated-models/models/ScopePayload.js';
import { DATA_CATEGORY } from './models/priv-terms.js';

/* eslint-disable no-param-reassign */
class ComputationAPI {
    /**
     * @param baseURL base URL (schema + host + port + base-path) to call
     */
    constructor(baseURL) {
        if (!baseURL) {
            this._baseURL = ComputationAPI.DEFAULT_URL;
        }
        else if (baseURL === 'false') {
            this._baseURL = ComputationAPI.MOCK_URL;
        }
        else {
            this._baseURL = baseURL;
        }
        // make sure the base URL never has a trailing slash
        this._baseURL = this._baseURL.replace(/\/+$/, '');
    }
    get isMocked() {
        return this._baseURL === ComputationAPI.MOCK_URL;
    }
    fullURL(endpoint) {
        // endpoint should always have one leading slash
        return `${this._baseURL}${endpoint.replace(/^\/*/, '/')}`;
    }
    get baseURL() {
        return this._baseURL;
    }
    /**
     *
     * @param baseURL base URL (schema + host + port + base-path) to call (for default behavior, see mock)
     * @param force override any preexisting configuration if it exists
     *
     */
    static configure(baseURL, force = false) {
        if (ComputationAPI.instance && !force) {
            if (baseURL !== ComputationAPI.getInstance().baseURL &&
                baseURL &&
                baseURL !== 'false') {
                /* eslint-disable no-console */
                console.log('[Computation API] Configuration conflict');
                console.log(`[Computation API] configured value: ${ComputationAPI.getInstance().baseURL}`);
                console.log(`[Computation API] conflicting value: ${baseURL}`);
                /* eslint-enable no-console */
            }
            return false;
        }
        ComputationAPI.instance = new ComputationAPI(baseURL);
        return true;
    }
    static getInstance() {
        if (!ComputationAPI.instance) {
            throw new Error('[Computation API] trying to use the API before configuring it');
        }
        return ComputationAPI.instance;
    }
    headers(acceptJSON = false, request) {
        return new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            // TODO: remove this when auth is implemented
            Authorization: localStorage.getItem('priv_user_id') || 'john.doe@example.com',
            ...(this.isMocked && request
                ? { Prefer: this.getMockHeader(request) }
                : {}),
            ...(acceptJSON ? { accept: 'application/json' } : {}),
        });
    }
    /**
     * Determine the correct mock header for a PrivacyRequest
     * @param request PrivacyRequest to get mock header for
     * @returns String to be used in the "prefer" header
     */
    getMockHeader(request) {
        // If more than 1 demand, send the default multi demand response
        if (request.demands.length > 1) {
            return 'code=200, example=TRANSPARENCY Multi-Response';
        }
        // Select the mock response corresponding to this action
        if (request.demands.length === 1) {
            const { action } = request.demands[0];
            return `code=200, example=${action} Response`;
        }
        // If no demands get bad request response
        return 'code=400';
    }
    preProcessRequest(request) {
        // If all privacy scopes provided, this is the same as no restriction
        const allDataCategories = Object.values(DATA_CATEGORY).filter(dc => dc !== DATA_CATEGORY.ALL && !dc.includes('.'));
        request.demands.forEach(d => {
            if (d.restrictions && d.restrictions.privacy_scope) {
                const demandDcs = d.restrictions.privacy_scope.map(psr => psr.dc);
                if (allDataCategories.every(dc => demandDcs.includes(dc))) {
                    const demand = d;
                    delete demand.restrictions.privacy_scope;
                }
            }
        });
        return request;
    }
    /**
     * Send a PrivacyRequest to the privacy-request API
     * @param {PrivacyRequest} request Request body to send
     * @returns
     */
    async sendPrivacyRequest(request) {
        const endpoint = `/privacy-request`;
        const preparedRequest = this.preProcessRequest(request);
        const response = await fetch(this.fullURL(endpoint), {
            method: 'POST',
            headers: this.headers(false, request),
            body: JSON.stringify(preparedRequest),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }
    async getRequestHistory() {
        const endpoint = '/privacy-request/history';
        const response = await fetch(this.fullURL(endpoint), {
            method: 'GET',
            headers: this.headers(true),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }
    async getRequest(requestId) {
        const endpoint = `/privacy-request/${requestId}`;
        const response = await fetch(this.fullURL(endpoint), {
            method: 'GET',
            headers: this.headers(true),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }
    async cancelDemand(demand_id) {
        const endpoint = `/privacy-request/${demand_id}`;
        const headers = this.headers(true);
        const body = JSON.stringify({ demand_id });
        const response = await fetch(this.fullURL(endpoint), {
            method: 'POST',
            headers,
            body,
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }
    // Data consumer endpoints
    /**
     * Gets a list of all demands which are pending a response
     * @returns {PendingDemandPayload[]}
     */
    async getPendingDemands() {
        return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests`, {
            method: 'GET',
            headers: { accept: 'application/json' },
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    /**
     * Get the info and recomendation for a specific demand
     * @param {string} id uuid of the demand
     * @returns {PendingDemandDetailsPayload}
     */
    async getPendingDemandDetails(id) {
        return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/${id}`, {
            method: 'GET',
            headers: { accept: 'application/json' },
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    /**
     * Approve a demand
     * @param id uuid of the demand to approve
     * @param msg optional message explaining the approval
     * @param lang language of the message
     * @returns
     */
    async grantDemand(id, msg, lang) {
        if (id === undefined) {
            throw TypeError('You must pass an ID of the demand to deny.');
        }
        if (!msg) {
            msg = undefined;
        }
        const payload = { id, msg, lang };
        return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        });
    }
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
    async denyDemand(id, motive = DenyDemandPayload.motive.OTHER_MOTIVE, msg, lang) {
        if (id === undefined) {
            throw TypeError('You must pass an ID of the demand to deny.');
        }
        const payload = { id, motive, msg, lang };
        return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/deny`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        });
    }
    static clean() {
        ComputationAPI.instance = null;
    }
}
ComputationAPI.instance = null;
ComputationAPI.MOCK_URL = 'https://stoplight.io/mocks/blindnet/product-management:open-api/74767654';
ComputationAPI.DEFAULT_URL = 'https://devkit-pce-staging.azurewebsites.net/v0';

export { ComputationAPI };
//# sourceMappingURL=computation-api.js.map
