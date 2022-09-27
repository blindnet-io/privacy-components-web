/* eslint-disable camelcase */
import {
  CreatePrivacyRequestPayload,
  RequestHistoryPayload,
  PrivacyResponsePayload,
  PendingDemandPayload,
  PendingDemandDetailsPayload,
  DenyDemandPayload,
} from '../api-generated/types.js';

export class ComputationAPI {
  private static instance: ComputationAPI | null = null;

  static readonly MOCK_URL =
    'https://stoplight.io/mocks/blindnet/product-management:open-api/74767654';

  static readonly DEFAULT_URL =
    'https://devkit-pce-staging.azurewebsites.net/v0';

  /**
   * @param baseURL base URL (schema + host + port + base-path) to call
   */
  private constructor(baseURL?: string) {
    if (!baseURL) {
      this._baseURL = ComputationAPI.DEFAULT_URL;
    } else if (baseURL === 'false') {
      this._baseURL = ComputationAPI.MOCK_URL;
    } else {
      this._baseURL = baseURL;
    }
    // make sure the base URL never has a trailing slash
    this._baseURL = this._baseURL.replace(/\/+$/, '');
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

  /**
   *
   * @param baseURL base URL (schema + host + port + base-path) to call (for default behavior, see mock)
   * @param mock flag indicating if the mock endpoint should be used when no base URL is specified (staging environment if false, stoplight if true)
   */
  public static init(baseURL?: string) {
    if (ComputationAPI.instance) {
      throw new Error('Computation API has already been initialized');
    }

    ComputationAPI.instance = new ComputationAPI(baseURL);
  }

  public static getInstance(): ComputationAPI {
    if (!ComputationAPI.instance) {
      throw new Error("Computation API hasn't been initialized");
    }

    return ComputationAPI.instance;
  }

  private headers(
    acceptJSON = false,
    request?: CreatePrivacyRequestPayload
  ): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // TODO: remove this when auth is implemented
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

  static clean() {
    ComputationAPI.instance = null;
  }

  // Privacy Request Endpoints

  // TODO: Figure out how to handle data categories, as these aren't an enum
  // private preProcessRequest(request: CreatePrivacyRequestPayload): CreatePrivacyRequestPayload {
  //   // If all privacy scopes provided, this is the same as no restriction
  //   const allDataCategories = Object.values(DATA_CATEGORY).filter(
  //     dc => dc !== DATA_CATEGORY.ALL && !dc.includes('.')
  //   );
  //   request.demands.forEach(d => {
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
   * @param {PrivacyRequest} request Request body to send
   * @returns
   */
  // async sendPrivacyRequest(
  //   request: CreatePrivacyRequestPayload
  // ): Promise<{ request_id: string }> {
  //   const endpoint = `/privacy-request`;

  //   const preparedRequest = this.preProcessRequest(request);

  //   const response = await fetch(this.fullURL(endpoint), {
  //     method: 'POST',
  //     headers: this.headers(false, request),
  //     body: JSON.stringify(preparedRequest),
  //   });

  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   return response.json();
  // }

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

  async getRequest(requestId: string): Promise<PrivacyResponsePayload> {
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
  async approveDemand(id: string, msg: string, lang: string = 'en') {
    if (id === undefined) {
      throw TypeError('You must pass an ID of the demand to deny.');
    }

    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/approve`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, msg, lang }),
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
    msg: string,
    motive: DenyDemandPayload['motive'] = 'OTHER-MOTIVE',
    lang: string = 'en'
  ) {
    if (id === undefined) {
      throw TypeError('You must pass an ID of the demand to deny.');
    }

    return fetch(
      `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/deny`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, motive, msg, lang }),
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    });
  }
}
