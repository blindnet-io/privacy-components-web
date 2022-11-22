/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import {
  ApproveDemandPayload,
  CreatePrivacyRequestPayload,
  DataCategoryResponsePayload,
  DenyDemandPayload,
  GivenConsentsPayload,
  PendingDemandDetailsPayload,
  PendingDemandPayload,
  PrivacyResponsePayload,
  RequestHistoryPayload,
} from '../models/generated-models/index.js';

export class ComputationAPI {
  private static instance: ComputationAPI | null = null;

  static readonly MOCK_URL =
    'https://stoplight.io/mocks/blindnet/product-management:open-api/74767654';

  static readonly DEFAULT_URL =
    'https://devkit-pce-staging.azurewebsites.net/v0';

  /**
   * @param baseURL base URL (schema + host + port + base-path) to call
   */
  private constructor(
    baseURL?: string,
    apiToken?: string,
    adminToken?: string
  ) {
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
      this._apiToken = '';
    } else {
      this._apiToken = apiToken;
    }

    if (!adminToken) {
      // eslint-disable-next-line no-console
      this._adminToken = '';
    } else {
      this._adminToken = adminToken;
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

  public setToken(apiToken: string) {
    this._apiToken = apiToken;
  }

  public apiTokenSet() {
    return this._apiToken !== '';
  }

  private _adminToken: string;

  public setAdminToken(adminToken: string) {
    this._adminToken = adminToken;
  }

  public adminTokenSet() {
    return this._adminToken !== '';
  }

  /**
   *
   * @param baseURL base URL (schema + host + port + base-path) to call (for default behavior, see mock)
   * @param force override any preexisting configuration if it exists
   *
   */
  public static configure(
    baseURL?: string,
    apiToken?: string,
    adminToken?: string,
    force = false
  ): boolean {
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

      return false;
    }
    ComputationAPI.instance = new ComputationAPI(baseURL, apiToken, adminToken);
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

  private headers(
    acceptJSON = false,
    requireAuth = true,
    request?: CreatePrivacyRequestPayload
  ): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...(this.isMocked && request
        ? { Prefer: this.getMockHeader(request) }
        : {}),
      ...(acceptJSON ? { accept: 'application/json' } : {}),
    });

    // Append auth header if required and api token is defined
    if (requireAuth && !this._apiToken) {
      throw new Error('You must include a valid Authorization header!');
    } else if (this._apiToken) {
      headers.append('Authorization', `Bearer ${this._apiToken}`);
    }

    return headers;
  }

  /**
   * Determine the correct mock header for a PrivacyRequest
   * @param request PrivacyRequest to get mock header for
   * @returns String to be used in the "prefer" header
   */
  private getMockHeader(request: CreatePrivacyRequestPayload): string {
    // If more than 1 demand, send the default multi demand response
    if (request.demands && request.demands.length > 1) {
      return 'code=200, example=TRANSPARENCY Multi-Response';
    }

    // Select the mock response corresponding to this action
    if (request.demands && request.demands.length === 1) {
      const { action } = request.demands[0];
      return `code=200, example=${action} Response`;
    }

    // If no demands get bad request response
    return 'code=400';
  }

  // Configuration endpoints

  async getDataCategories(): Promise<DataCategoryResponsePayload[]> {
    const endpoint = `/configure/data-categories`;

    const response = await fetch(this.fullURL(endpoint), {
      method: 'GET',
      headers: this.headers(true),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  // Privacy Request Endpoints

  // private preProcessRequest(
  //   request: CreatePrivacyRequestPayload
  // ): CreatePrivacyRequestPayload {
  //   // If all privacy scopes provided, this is the same as no restriction
  //   const allDataCategories = Object.values(DATA_CATEGORY).filter(
  //     dc => dc !== DATA_CATEGORY.ALL && !dc.includes('.')
  //   );
  //   request.demands!.forEach(d => {
  //     if (d.restrictions && d.restrictions.privacy_scope) {
  //       const demandDcs = d.restrictions.privacy_scope!.map(psr => psr.dc);
  //       if (allDataCategories.every(dc => demandDcs.includes(dc))) {
  //         const demand = d;
  //         delete demand.restrictions!.privacy_scope;
  //       }
  //     }
  //   });

  //   return request;
  // }

  /**
   * Send a PrivacyRequest to the privacy-request API
   * @param {CreatePrivacyRequestPayload} request Request body to send
   * @returns
   */
  async sendPrivacyRequest(
    request: CreatePrivacyRequestPayload
  ): Promise<{ request_id: string }> {
    const endpoint = `/privacy-request`;

    // const preparedRequest = this.preProcessRequest(request);

    // Only allow no auth header for certain requests
    const authRequired = request.demands!.every(demand =>
      demand.action.includes('TRANSPARENCY')
    );

    const response = await fetch(this.fullURL(endpoint), {
      method: 'POST',
      headers: this.headers(true, authRequired, request),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async getRequestHistory(): Promise<RequestHistoryPayload> {
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

  async getRequest(requestId: string): Promise<PrivacyResponsePayload[]> {
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
    const endpoint = '/privacy-request/cancel';

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
  async getPendingDemands(newAdminToken?: string) {
    // Update the admin token if one was passed
    if (typeof newAdminToken !== 'undefined') {
      this.setAdminToken(newAdminToken);
    } else if (!this._adminToken) {
      throw new Error('You must set an admin token before making API calls!');
    }

    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this._adminToken}`,
        },
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
  async getPendingDemandDetails(id: string, newAdminToken?: string) {
    // Update the admin token if one was passed
    if (typeof newAdminToken !== 'undefined') {
      this.setAdminToken(newAdminToken);
    } else if (!this._adminToken) {
      throw new Error('You must set an admin token before making API calls!');
    }

    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/${id}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this._adminToken}`,
        },
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
  async grantDemand(
    id: string,
    msg?: string,
    lang?: string,
    newAdminToken?: string
  ) {
    // Update the admin token if one was passed
    if (typeof newAdminToken !== 'undefined') {
      this.setAdminToken(newAdminToken);
    } else if (!this._adminToken) {
      throw new Error('You must set an admin token before making API calls!');
    }

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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._adminToken}`,
        },
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
    lang?: string,
    newAdminToken?: string
  ) {
    // Update the admin token if one was passed
    if (typeof newAdminToken !== 'undefined') {
      this.setAdminToken(newAdminToken);
    } else if (!this._adminToken) {
      throw new Error('You must set an admin token before making API calls!');
    }

    if (id === undefined) {
      throw TypeError('You must pass an ID of the demand to deny.');
    }

    const payload: DenyDemandPayload = { id, motive, msg, lang };

    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/deny`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._adminToken}`,
        },
        body: JSON.stringify(payload),
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    });
  }

  // User info endpoints

  /**
   * Get consents given by the user authenticated by the current token
   */
  async getUserConsents(): Promise<GivenConsentsPayload[]> {
    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/user/consents`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this._apiToken}`,
        },
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<GivenConsentsPayload[]>;
    });
  }

  static clean() {
    ComputationAPI.instance = null;
  }
}
