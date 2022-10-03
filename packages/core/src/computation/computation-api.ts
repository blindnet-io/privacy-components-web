/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import {
  ApproveDemandPayload,
  DenyDemandPayload,
  PendingDemandDetailsPayload,
  PendingDemandPayload,
} from './generated-models/index.js';
import { HistoryResponse } from './models/history-response.js';
import { DATA_CATEGORY } from './models/priv-terms.js';
import { PrivacyRequest } from './models/privacy-request.js';
import { PrivacyResponse } from './models/privacy-response.js';

export class ComputationAPI {
  private static instance: ComputationAPI | null = null;

  static readonly MOCK_URL =
    'https://stoplight.io/mocks/blindnet/product-management:open-api/74767654';

  static readonly DEFAULT_URL =
    'https://devkit-pce-staging.azurewebsites.net/v0';

  /**
   * @param baseURL base URL (schema + host + port + base-path) to call
   */
  private constructor(baseURL?: string, apiToken?: string) {
    if (!baseURL) {
      this._baseURL = ComputationAPI.DEFAULT_URL;
    } else if (baseURL === 'false') {
      this._baseURL = ComputationAPI.MOCK_URL;
    } else {
      this._baseURL = baseURL;
    }
    // make sure the base URL never has a trailing slash
    this._baseURL = this._baseURL.replace(/\/+$/, '');

    if (!apiToken) {
      this._apiToken = 'john.doe@example.com'
    } else {
      this._apiToken = apiToken
    }
  }

  get isMocked(): boolean {
    return this._baseURL === ComputationAPI.MOCK_URL;
  }

  private fullURL(endpoint: string) {
    // endpoint should always have one leading slash
    return `${this._baseURL}${endpoint.replace(/^\/*/, '/')}`;
  }

  /**
   * base URL (schema + host + port + base-path) for all calls
   */
  private _baseURL: string;

  get baseURL(): string {
    return this._baseURL;
  }

  private _apiToken: string;

  /**
   *
   * @param baseURL base URL (schema + host + port + base-path) to call (for default behavior, see mock)
   * @param force override any preexisting configuration if it exists
   *
   */
  public static configure(baseURL?: string, apiToken?: string, force = false): boolean {
    if (ComputationAPI.instance && !force) {
      if (
        baseURL !== ComputationAPI.getInstance().baseURL &&
        baseURL &&
        baseURL !== 'false'
      ) {
        /* eslint-disable no-console */
        console.log('[Computation API] Configuration conflict');
        console.log(
          `[Computation API] configured value: ${
            ComputationAPI.getInstance().baseURL
          }`
        );
        console.log(`[Computation API] conflicting value: ${baseURL}`);
        /* eslint-enable no-console */
      }
      if ( apiToken !== ComputationAPI.getInstance()._apiToken && apiToken ) {
          /* eslint-disable no-console */
          console.log('[Computation API] Configuration conflict');
          console.log(
            `[Computation API] configured value: ${
              ComputationAPI.getInstance()._apiToken
            }`
          );
          console.log(`[Computation API] conflicting value: ${apiToken}`);
          /* eslint-enable no-console */
        }
        
      return false;
    }
    ComputationAPI.instance = new ComputationAPI(baseURL, apiToken);
    return true;
  }

  public static getInstance(): ComputationAPI {
    if (!ComputationAPI.instance) {
      throw new Error(
        '[Computation API] trying to use the API before configuring it'
      );
    }

    return ComputationAPI.instance;
  }

  private headers(acceptJSON = false, request?: PrivacyRequest): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization:
        localStorage.getItem('priv_user_id') || 'john.doe@example.com',
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
  private getMockHeader(request: PrivacyRequest): string {
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

  private preProcessRequest(request: PrivacyRequest): PrivacyRequest {
    // If all privacy scopes provided, this is the same as no restriction
    const allDataCategories = Object.values(DATA_CATEGORY).filter(
      dc => dc !== DATA_CATEGORY.ALL && !dc.includes('.')
    );
    request.demands.forEach(d => {
      if (d.restrictions && d.restrictions.privacy_scope) {
        const demandDcs = d.restrictions.privacy_scope!.map(psr => psr.dc);
        if (allDataCategories.every(dc => demandDcs.includes(dc))) {
          const demand = d;
          delete demand.restrictions!.privacy_scope;
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
  async sendPrivacyRequest(
    request: PrivacyRequest
  ): Promise<{ request_id: string }> {
    const endpoint = `/privacy-request`;

    const preparedRequest = this.preProcessRequest(request);

    const response = await fetch(this.fullURL(endpoint), {
      method: 'POST',
      headers: this.headers(true, request),
      body: JSON.stringify(preparedRequest),
    });

    // console.log(await response.json())


    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async getRequestHistory(): Promise<HistoryResponse> {
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

  async getRequest(requestId: string): Promise<PrivacyResponse> {
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

  async cancelDemand(demand_id: string): Promise<void> {
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
    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests`,
      {
        method: 'GET',
        headers: { accept: 'application/json' },
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<PendingDemandPayload[]>;
    });
  }

  /**
   * Get the info and recomendation for a specific demand
   * @param {string} id uuid of the demand
   * @returns {PendingDemandDetailsPayload}
   */
  async getPendingDemandDetails(id: string) {
    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/${id}`,
      {
        method: 'GET',
        headers: { accept: 'application/json' },
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<PendingDemandDetailsPayload>;
    });
  }

  /**
   * Approve a demand
   * @param id uuid of the demand to approve
   * @param msg optional message explaining the approval
   * @param lang language of the message
   * @returns
   */
  async grantDemand(id: string, msg?: string, lang?: string) {
    if (id === undefined) {
      throw TypeError('You must pass an ID of the demand to deny.');
    }

    if (!msg) {
      msg = undefined;
    }

    const payload: ApproveDemandPayload = { id, msg, lang };

    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/approve`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    ).then(response => {
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
  async denyDemand(
    id: string,
    motive: DenyDemandPayload.motive = DenyDemandPayload.motive.OTHER_MOTIVE,
    msg?: string,
    lang?: string
  ) {
    if (id === undefined) {
      throw TypeError('You must pass an ID of the demand to deny.');
    }

    const payload: DenyDemandPayload = { id, motive, msg, lang };

    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/deny`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    });
  }

  static clean() {
    ComputationAPI.instance = null;
  }
}
