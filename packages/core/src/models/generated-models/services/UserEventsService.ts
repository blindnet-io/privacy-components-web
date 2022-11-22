/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndContractPayload } from '../models/EndContractPayload.js';
import type { EndLegitimateInterestPayload } from '../models/EndLegitimateInterestPayload.js';
import type { GiveConsentPayload } from '../models/GiveConsentPayload.js';
import type { StartContractPayload } from '../models/StartContractPayload.js';
import type { StartLegitimateInterestPayload } from '../models/StartLegitimateInterestPayload.js';

import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';

export class UserEventsService {
  /**
   * Add consent for a user
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static postV0UserEventsConsent(
    requestBody: GiveConsentPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/user-events/consent',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * Start service contract for a user
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static postV0UserEventsContractStart(
    requestBody: StartContractPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/user-events/contract/start',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * End service contract for a user
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static postV0UserEventsContractEnd(
    requestBody: EndContractPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/user-events/contract/end',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * Start legitimate interest for a user
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static postV0UserEventsLegitimateInterestStart(
    requestBody: StartLegitimateInterestPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/user-events/legitimate-interest/start',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * End legitimate interest for a user
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static postV0UserEventsLegitimateInterestEnd(
    requestBody: EndLegitimateInterestPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/user-events/legitimate-interest/end',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }
}
