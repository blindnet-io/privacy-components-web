/* eslint-disable camelcase */
import { HistoryResponse } from '../models/history-response.js';
import { DATA_CATEGORY } from '../models/priv-terms.js';
import { PrivacyRequest } from '../models/privacy-request.js';
import { PrivacyResponse } from '../models/privacy-response.js';

export class ComputationAPI {
  /**
   *
   * @param baseURL base URL (schema + host + port + base-path) to call (for default behavior, see mock)
   * @param mock flag indicating if the mock endpoint should be used when no base URL is specified (staging environment if false, stoplight if true)
   */
  constructor(baseURL?: string, private mock = false) {
    this.baseURL =
      baseURL ||
      (mock
        ? 'https://stoplight.io/mocks/blindnet/product-management:open-api/74767654/'
        : 'https://devkit-pce-staging.azurewebsites.net/v0/');
  }

  /**
   * base URL (schema + host + port + base-path) for all calls
   */
  private baseURL: string;

  private headers(acceptJSON = false, request?: PrivacyRequest): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // TODO: remove this when auth is implemented
      Authorization:
        localStorage.getItem('priv_user_id') || 'john.doe@example.com',
      ...(this.mock && request ? { Prefer: this.getMockHeader(request) } : {}),
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
    const preparedRequest = this.preProcessRequest(request);

    const url = new URL('/privacy-request', this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers(false, request),
      body: JSON.stringify(preparedRequest),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async getRequestHistory(): Promise<HistoryResponse> {
    const url = new URL('/privacy-request/history', this.baseURL);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers(true),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async getRequest(requestId: string): Promise<PrivacyResponse> {
    const url = new URL(`/privacy-request/${requestId}`, this.baseURL);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers(true),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  async cancelDemand(demand_id: string): Promise<void> {
    const url = new URL(`/privacy-request/${requestId}`, this.baseURL);
    const headers = this.headers(true);
    const body = JSON.stringify({ demand_id });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

}
